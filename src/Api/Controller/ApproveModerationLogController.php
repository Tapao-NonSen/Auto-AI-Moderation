<?php

namespace Tapao\ModerationAI\Api\Controller;

use Flarum\Http\RequestUtil;
use Tapao\ModerationAI\Model\ModerationLog;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;

class ApproveModerationLogController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id  = $request->getAttribute('id');
        $log = ModerationLog::findOrFail($id);

        // Preserve action_taken (what the AI did); only set review fields
        $log->update([
            'reviewed_by'     => $actor->id,
            'reviewed_at'     => now(),
            'review_decision' => 'approved',
        ]);

        return new JsonResponse(['data' => ['id' => $log->id, 'review_decision' => 'approved']]);
    }
}
