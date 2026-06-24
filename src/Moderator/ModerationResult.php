<?php

namespace Tapao\ModerationAI\Moderator;

class ModerationResult
{
    public bool   $flagged;
    public array  $categories;
    public array  $categoryScores;
    public string $model;

    public static function fromApiResponse(array $data): self
    {
        $result = $data['results'][0] ?? [];
        $self = new self();
        $self->flagged        = $result['flagged'] ?? false;
        $self->categories     = $result['categories'] ?? [];
        $self->categoryScores = $result['category_scores'] ?? [];
        $self->model          = $data['model'] ?? 'unknown';
        return $self;
    }

    /** Safe fallback result when API is unavailable */
    public static function safe(string $model = 'unknown'): self
    {
        $self = new self();
        $self->flagged        = false;
        $self->categories     = [];
        $self->categoryScores = [];
        $self->model          = $model;
        return $self;
    }

    public function topViolation(): ?array
    {
        if (!$this->flagged) return null;
        $flaggedScores = array_filter(
            $this->categoryScores,
            fn($score, $cat) => ($this->categories[$cat] ?? false),
            ARRAY_FILTER_USE_BOTH
        );
        if (empty($flaggedScores)) return null;
        arsort($flaggedScores);
        $top = array_key_first($flaggedScores);
        return ['category' => $top, 'score' => $flaggedScores[$top]];
    }
}
