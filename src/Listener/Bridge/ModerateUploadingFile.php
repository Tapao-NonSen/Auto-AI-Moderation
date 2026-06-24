<?php

namespace Tapao\ModerationAI\Listener\Bridge;

use Flarum\Settings\SettingsRepositoryInterface;
use Tapao\ModerationAI\Moderator\ContentModerator;
use Tapao\ModerationAI\Action\ActionHandler;
use Tapao\ModerationAI\Model\ModerationLog;
use Illuminate\Validation\ValidationException;

class ModerateUploadingFile
{
    public function __construct(
        protected ContentModerator $moderator,
        protected ActionHandler $actionHandler,
        protected SettingsRepositoryInterface $settings,
    ) {}

    /**
     * Works with both blomstra/flarum-ext-upload and fof/upload events.
     * The event must expose a getFile() or file property with a URL or temp path.
     */
    public function handle(mixed $event): void
    {
        if (!$this->settings->get('moderationai.scan_images', true)) return;

        // Try to get the file URL from the event
        $url = null;
        if (method_exists($event, 'getUrl'))  $url = $event->getUrl();
        elseif (isset($event->file->url))      $url = $event->file->url;
        elseif (isset($event->upload->url))    $url = $event->upload->url;

        // For temp files without a URL yet, skip — will be caught by post body scan
        if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) return;

        $result = $this->moderator->moderate([], [$url]);
        if (!$result) return;

        ModerationLog::create([
            'content_type'    => 'upload',
            'content_id'      => 0,
            'field'           => 'image',
            'openai_model'    => $result->model,
            'flagged'         => $result->flagged,
            'categories'      => $result->categories,
            'category_scores' => $result->categoryScores,
        ]);

        if ($result->flagged) {
            $violation = $result->topViolation();
            throw ValidationException::withMessages([
                'upload' => [
                    'This image was rejected by the moderation system'
                    . ($violation ? " ({$violation['category']})" : '') . '.'
                ],
            ]);
        }
    }
}
