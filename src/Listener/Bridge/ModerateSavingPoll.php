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

        // $poll->options may be an Eloquent Collection or array; foreach handles both.
        $texts = [$poll->question ?? ''];
        foreach ($poll->options ?? [] as $opt) {
            $texts[] = is_object($opt) ? ($opt->answer ?? '') : (string) $opt;
        }

        $result = $this->moderator->moderate(array_values(array_filter($texts)));
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
