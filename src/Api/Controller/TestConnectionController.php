<?php

namespace Tapao\ModerationAI\Api\Controller;

use Flarum\Http\RequestUtil;
use Tapao\ModerationAI\Api\OpenAIModerationClient;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;

class TestConnectionController implements RequestHandlerInterface
{
    public function __construct(protected OpenAIModerationClient $client) {}

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $body   = (array) $request->getParsedBody();
        $apiKey = isset($body['apiKey']) ? (string) $body['apiKey'] : null;
        $model  = isset($body['model'])  ? (string) $body['model']  : null;

        $result = $this->client->testConnection($apiKey, $model);

        // Always return 200 so the frontend can read the error message in the
        // body; the `ok` flag conveys success/failure.
        return new JsonResponse($result);
    }
}
