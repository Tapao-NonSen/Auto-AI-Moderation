<?php

namespace Tapao\ModerationAI\Model;

use Flarum\Database\AbstractModel;
use Flarum\User\User;

class ModerationLog extends AbstractModel
{
    protected $table = 'moderation_logs';

    protected $casts = [
        'flagged'         => 'boolean',
        'categories'      => 'array',
        'category_scores' => 'array',
        'reviewed_at'     => 'datetime',
        'webhook_sent'    => 'boolean',
    ];

    protected $fillable = [
        'content_type', 'content_id', 'field', 'openai_model',
        'flagged', 'categories', 'category_scores', 'action_taken',
        'reviewed_by', 'reviewed_at', 'review_decision',
        'content_hash', 'webhook_sent',
    ];

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
