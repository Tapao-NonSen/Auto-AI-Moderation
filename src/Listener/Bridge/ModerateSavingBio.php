<?php

namespace Tapao\ModerationAI\Listener\Bridge;

use Tapao\ModerationAI\Moderator\ContentModerator;
use Tapao\ModerationAI\Action\ActionHandler;
use Tapao\ModerationAI\Model\ModerationLog;

class ModerateSavingBio
{
    public function __construct(
        protected ContentModerator $moderator,
        protected ActionHandler $actionHandler,
    ) {}

    public function handle(mixed $event): void
    {
        $user = $event->user ?? null;
        $bio  = $event->bio  ?? ($user->bio ?? '');

        if (empty(trim($bio))) return;

        $result = $this->moderator->moderate([strip_tags($bio)]);
        if (!$result) return;

        $log = ModerationLog::create([
            'content_type'    => 'bio',
            'content_id'      => $user?->id ?? 0,
            'field'           => 'bio',
            'openai_model'    => $result->model,
            'flagged'         => $result->flagged,
            'categories'      => $result->categories,
            'category_scores' => $result->categoryScores,
        ]);

        if ($result->flagged) {
            $this->actionHandler->handle($result, $user, 'bio', $log);
        }
    }
}
