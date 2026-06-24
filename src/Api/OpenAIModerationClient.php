<?php

namespace Tapao\ModerationAI\Api;

use GuzzleHttp\Client;
use Tapao\ModerationAI\Moderator\ModerationResult;
use Flarum\Settings\SettingsRepositoryInterface;

class OpenAIModerationClient
{
    protected Client $http;
    protected string $apiKey;
    protected string $model;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->apiKey = $settings->get('moderationai.openai_api_key', '');
        $this->model  = $settings->get('moderationai.model', 'omni-moderation-latest');
        $this->http   = new Client(['timeout' => 20]);
    }

    /**
     * Moderate mixed text + image inputs in one API call.
     *
     * $inputs format:
     * [
     *   ["type" => "text",      "text" => "some content"],
     *   ["type" => "image_url", "image_url" => ["url" => "https://..."]]
     * ]
     */
    public function moderate(array $inputs): ModerationResult
    {
        if (empty($this->apiKey)) {
            throw new \RuntimeException('ModerationAI: OpenAI API key not configured.');
        }

        try {
            $response = $this->http->post('https://api.openai.com/v1/moderations', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type'  => 'application/json',
                ],
                'json' => [
                    'model' => $this->model,
                    'input' => $inputs,
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            return ModerationResult::fromApiResponse($data);

        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            error_log('ModerationAI API error: ' . $e->getMessage());
            return ModerationResult::safe($this->model);
        }
    }

    public function testConnection(): bool
    {
        try {
            $this->moderate([['type' => 'text', 'text' => 'test']]);
            return true;
        } catch (\Throwable) {
            return false;
        }
    }
}
