<?php

namespace Tapao\ModerationAI\Listener;

use Flarum\User\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Tapao\ModerationAI\Moderator\ContentModerator;
use Tapao\ModerationAI\Action\ActionHandler;
use Tapao\ModerationAI\Model\ModerationLog;

class ModerateSavingUser
{
    public function __construct(
        protected ContentModerator $moderator,
        protected ActionHandler $actionHandler,
        protected SettingsRepositoryInterface $settings,
    ) {}

    public function handle(Saving $event): void
    {
        $user  = $event->user;
        $actor = $event->actor;

        if ($actor && $actor->isAdmin()) return;

        // Phase 1 text fields
        $textFields = array_values(array_filter([
            $user->isDirty('username')     ? $user->username     : null,
            $user->isDirty('display_name') ? $user->display_name : null,
        ]));

        // Phase 2: avatar image
        $imageUrls = [];
        if ($user->isDirty('avatar_url')
            && $this->settings->get('moderationai.scan_images', true)) {
            $avatarUrl = $user->avatar_url;
            if (filter_var($avatarUrl, FILTER_VALIDATE_URL)) {
                $imageUrls[] = $avatarUrl;
            }
        }

        if (empty($textFields) && empty($imageUrls)) return;

        $result = $this->moderator->moderate($textFields, $imageUrls, $user);
        if (!$result) return;

        $log = ModerationLog::create([
            'content_type'    => 'user',
            'content_id'      => $user->id ?? 0,
            'field'           => 'username/avatar',
            'openai_model'    => $result->model,
            'flagged'         => $result->flagged,
            'categories'      => $result->categories,
            'category_scores' => $result->categoryScores,
        ]);

        if ($result->flagged) {
            $this->actionHandler->handle($result, $user, 'user', $log);
        }
    }
}
