<?php

namespace Tapao\ModerationAI\Listener\Bridge;

use Tapao\ModerationAI\Moderator\ContentModerator;
use Tapao\ModerationAI\Model\ModerationLog;
use Illuminate\Validation\ValidationException;

class ModerateSavingProfileImage
{
    public function __construct(protected ContentModerator $moderator) {}

    public function handle(mixed $event): void
    {
        $url = $event->imageUrl ?? $event->url ?? null;
        if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) return;

        $result = $this->moderator->moderate([], [$url]);
        if (!$result || !$result->flagged) return;

        ModerationLog::create([
            'content_type'    => 'user',
            'content_id'      => $event->user?->id ?? 0,
            'field'           => 'profile_image',
            'openai_model'    => $result->model,
            'flagged'         => true,
            'categories'      => $result->categories,
            'category_scores' => $result->categoryScores,
            'action_taken'    => 'rejected',
        ]);

        throw ValidationException::withMessages([
            'image' => ['Your profile image was rejected by the moderation system.'],
        ]);
    }
}
