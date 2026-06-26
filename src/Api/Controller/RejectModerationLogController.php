<?php

namespace Tapao\ModerationAI\Api\Controller;

use Flarum\Http\RequestUtil;
use Tapao\ModerationAI\Model\ModerationLog;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;

class RejectModerationLogController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id  = $request->getAttribute('id');
        $log = ModerationLog::findOrFail($id);

        // Restore content if the AI action was 'hide'
        $this->restoreContent($log);

        // Preserve action_taken (what the AI did); only set review fields
        $log->update([
            'reviewed_by'     => $actor->id,
            'reviewed_at'     => now(),
            'review_decision' => 'rejected',
        ]);

        return new JsonResponse(['data' => ['id' => $log->id, 'review_decision' => 'rejected']]);
    }

    private function restoreContent(ModerationLog $log): void
    {
        if ($log->action_taken !== 'hide') {
            return; // Only auto-restore hidden content; deletions must be handled manually
        }

        $content = match($log->content_type) {
            'post'       => \Flarum\Post\Post::find($log->content_id),
            'discussion' => \Flarum\Discussion\Discussion::find($log->content_id),
            default      => null,
        };

        if (!$content) {
            return;
        }

        if (method_exists($content, 'restore')) {
            // Flarum's restore() only mutates the model; it must be persisted.
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
