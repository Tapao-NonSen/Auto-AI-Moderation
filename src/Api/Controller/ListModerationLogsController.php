<?php

namespace Tapao\ModerationAI\Api\Controller;

use Flarum\Http\RequestUtil;
use Tapao\ModerationAI\Model\ModerationLog;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;

class ListModerationLogsController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('administrate');

        $queryParams = $request->getQueryParams();
        $flaggedOnly = filter_var($queryParams['flagged'] ?? 'true', FILTER_VALIDATE_BOOLEAN);
        $limit       = min((int)($queryParams['limit'] ?? 20), 100);
        $offset      = (int)($queryParams['offset'] ?? 0);

        $query = ModerationLog::query()->orderByDesc('created_at');
        if ($flaggedOnly) $query->where('flagged', true);
        if (isset($queryParams['type'])) $query->where('content_type', $queryParams['type']);

        $logs = $query->skip($offset)->take($limit)->get();

        $data = $logs->map(fn($log) => [
            'id'         => (string) $log->id,
            'type'       => 'moderation-logs',
            'attributes' => [
                'content_type'    => $log->content_type,
                'content_id'      => $log->content_id,
                'field'           => $log->field,
                'openai_model'    => $log->openai_model,
                'flagged'         => $log->flagged,
                'categories'      => $log->categories,
                'category_scores' => $log->category_scores,
                'action_taken'    => $log->action_taken,
                'review_decision' => $log->review_decision,
                'reviewed_at'     => $log->reviewed_at?->toIso8601String(),
                'created_at'      => $log->created_at?->toIso8601String(),
            ],
        ])->values()->all();

        return new JsonResponse(['data' => $data]);
    }
}
