<?php

namespace Tapao\ModerationAI\Listener\Bridge;

use Tapao\ModerationAI\Moderator\ContentModerator;
use Tapao\ModerationAI\Action\ActionHandler;
use Tapao\ModerationAI\Model\ModerationLog;

class ModerateSavingPoll
{
    public function __construct(
        protected ContentModerator $moderator,
        protected ActionHandler $actionHandler,
    ) {}

    public function handle(mixed $event): void
    {
        $poll = $event->poll ?? $event->getPoll() ?? null;
        if (!$poll) return;

        $texts = array_filter([
            $poll->question ?? '',
            ...array_map(fn($opt) => $opt->answer ?? '', $poll->options ?? []),
        ]);

        $result = $this->moderator->moderate(array_values($texts));
        if (!$result) return;

        $log = ModerationLog::create([
            'content_type'    => 'poll',
            'content_id'      => $poll->id ?? 0,
            'field'           => 'question/options',
            'openai_model'    => $result->model,
            'flagged'         => $result->flagged,
            'categories'      => $result->categories,
            'category_scores' => $result->categoryScores,
        ]);

        if ($result->flagged) {
            $this->actionHandler->handle($result, $poll, 'poll', $log);
        }
    }
}
