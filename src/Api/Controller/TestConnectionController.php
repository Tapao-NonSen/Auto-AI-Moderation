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
        RequestUtil::getActor($request)->assertCan('administrate');

        $ok = $this->client->testConnection();

        return new JsonResponse(['success' => $ok], $ok ? 200 : 502);
    }
}
