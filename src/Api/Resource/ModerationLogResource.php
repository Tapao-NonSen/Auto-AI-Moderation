<?php

namespace Tapao\ModerationAI\Api\Resource;

use Tobyz\JsonApiServer\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use Flarum\Http\RequestUtil;
use Tapao\ModerationAI\Model\ModerationLog;
use Illuminate\Support\Carbon;

/**
 * ModerationLogResource
 *
 * Exposes the ModerationLog model through Flarum's JSON:API layer.
 *
 * Endpoints:
 *   GET   /api/moderation-logs       — list (admin only, filterable)
 *   PATCH /api/moderation-logs/{id}  — update (approve/reject review decision)
 */
class ModerationLogResource extends AbstractDatabaseResource
{
    public function type(): string
    {
        return 'moderation-logs';
    }

    public function model(): string
    {
        return ModerationLog::class;
    }

    public function scope(\Illuminate\Database\Eloquent\Builder $query, Context $context): void
    {
        // No additional scoping needed as access is guarded at the endpoint level
        // But we apply query filters here since $context->query is not available in Endpoint before() hooks
        $params = $context->request->getQueryParams();
        $filters = $params['filter'] ?? [];

        // filter[flagged]=1 (default true), filter[flagged]=0 (show all)
        $flaggedOnly = filter_var($filters['flagged'] ?? 'true', FILTER_VALIDATE_BOOLEAN);
        if ($flaggedOnly) {
            $query->where('flagged', true);
        }

        // filter[type]=post|discussion|user etc.
        if (!empty($filters['type'])) {
            $query->where('content_type', $filters['type']);
        }
    }

    public function filters(): array
    {
        return [
            \Tobyz\JsonApiServer\Schema\CustomFilter::make('flagged', fn() => null),
            \Tobyz\JsonApiServer\Schema\CustomFilter::make('type', fn() => null),
        ];
    }

    public function endpoints(): array
    {
        return [
            // GET /api/moderation-logs
            Endpoint\Index::make()
                ->paginate()
                ->defaultSort('-created_at')
                ->before(function (Context $context) {
                    $context->getActor()->assertAdmin();
                }),

            // PATCH /api/moderation-logs/{id}
            Endpoint\Update::make()
                ->before(fn (Context $context) => $context->getActor()->assertAdmin()),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Attribute::make('contentType')
                ->get(fn (ModerationLog $log) => $log->content_type)
                ->writable(fn () => false),

            Schema\Attribute::make('contentId')
                ->get(fn (ModerationLog $log) => $log->content_id)
                ->writable(fn () => false),

            Schema\Attribute::make('field')
                ->get(fn (ModerationLog $log) => $log->field)
                ->writable(fn () => false),

            Schema\Attribute::make('openaiModel')
                ->get(fn (ModerationLog $log) => $log->openai_model)
                ->writable(fn () => false),

            Schema\Attribute::make('flagged')
                ->get(fn (ModerationLog $log) => (bool) $log->flagged)
                ->writable(fn () => false),

            Schema\Attribute::make('categories')
                ->get(fn (ModerationLog $log) => $log->categories)
                ->writable(fn () => false),

            Schema\Attribute::make('categoryScores')
                ->get(fn (ModerationLog $log) => $log->category_scores)
                ->writable(fn () => false),

            Schema\Attribute::make('actionTaken')
                ->get(fn (ModerationLog $log) => $log->action_taken)
                ->writable(fn () => false),

            Schema\Attribute::make('reviewDecision')
                ->get(fn (ModerationLog $log) => $log->review_decision)
                ->writable(fn (ModerationLog $log, Context $context) => $context->getActor()->isAdmin())
                ->set(function (ModerationLog $log, $value, Context $context) {
                    $log->review_decision = $value;
                    $log->reviewed_by = $context->getActor()->id;
                    $log->reviewed_at = Carbon::now();

                    if ($value === 'rejected') {
                        $this->restoreContent($log);
                    }
                }),

            Schema\Attribute::make('reviewedAt')
                ->get(fn (ModerationLog $log) => $log->reviewed_at?->toIso8601String())
                ->writable(fn () => false),

            Schema\Attribute::make('createdAt')
                ->get(fn (ModerationLog $log) => $log->created_at?->toIso8601String())
                ->writable(fn () => false),
        ];
    }

    private function restoreContent(ModerationLog $log): void
    {
        if ($log->action_taken !== 'hide') {
            return; // Only auto-restore hidden content; deletions must be handled manually
        }

        $content = match ($log->content_type) {
            'post'       => \Flarum\Post\Post::find($log->content_id),
            'discussion' => \Flarum\Discussion\Discussion::find($log->content_id),
            default      => null,
        };

        if (!$content) {
            return;
        }

        if (method_exists($content, 'restore')) {
            $content->restore();
            $content->save();
        } elseif (property_exists($content, 'hidden_at')) {
            $content->hidden_at = null;
            $content->hidden_by_id = null;
            $content->save();
        } elseif (property_exists($content, 'is_hidden')) {
            $content->is_hidden = false;
            $content->save();
        }
    }
}
