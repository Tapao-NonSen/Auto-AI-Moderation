<?php

namespace Tapao\ModerationAI\Listener;

use Flarum\Post\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Tapao\ModerationAI\Moderator\ContentModerator;
use Tapao\ModerationAI\Action\ActionHandler;
use Tapao\ModerationAI\Model\ModerationLog;
use Tapao\ModerationAI\Queue\ModerationJob;
use Tapao\ModerationAI\Trust\UserTrustScore;
use Illuminate\Contracts\Queue\Queue;

class ModerateSavingPost
{
    public function __construct(
        protected ContentModerator $moderator,
        protected ActionHandler $actionHandler,
        protected SettingsRepositoryInterface $settings,
        protected Queue $queue,
        protected UserTrustScore $trustScore,
    ) {}

    public function handle(Saving $event): void
    {
        $post  = $event->post;
        $actor = $event->actor;

        // Exempt admins and configured groups
        $exemptGroups = json_decode($this->settings->get('moderationai.exempt_groups', '[1]'), true);
        if ($actor->isAdmin() || $actor->groups()->whereIn('id', $exemptGroups)->exists()) return;

        $rawBody   = $post->content ?? '';
        $plainText = strip_tags($rawBody);
        $imageUrls = $this->moderator->extractImageUrls($rawBody);

        $hash   = $this->moderator->contentHash([$plainText], $imageUrls);
        $postId = $post->id; // null for brand-new posts (Saving fires before DB insert)

        // Skip dedup check for new posts (no ID yet); for edits, skip unchanged content
        if ($postId !== null) {
            $existing = ModerationLog::where('content_type', 'post')
                ->where('content_id', $postId)
                ->where('field', 'body')
                ->where('content_hash', $hash)
                ->exists();
            if ($existing) return;
        }

        // Phase 3: async only for existing posts (new posts have no ID to queue with)
        $asyncMode = $this->settings->get('moderationai.mode', 'sync') === 'async';
        $needsSync = $this->trustScore->requiresSync($actor);

        if ($asyncMode && !$needsSync && $postId !== null) {
            $this->queue->push(new ModerationJob('post', $postId, 'body', [$plainText], $imageUrls));
            return;
        }

        // Synchronous path
        $result = $this->moderator->moderate([$plainText], $imageUrls, $actor);
        if (!$result) return;

        $log = ModerationLog::create([
            'content_type'    => 'post',
            'content_id'      => $postId ?? 0,
            'field'           => 'body',
            'openai_model'    => $result->model,
            'flagged'         => $result->flagged,
            'categories'      => $result->categories,
            'category_scores' => $result->categoryScores,
            'content_hash'    => $hash,
        ]);

        if ($result->flagged) {
            $this->actionHandler->handle($result, $post, 'post', $log);
        }
    }
}
