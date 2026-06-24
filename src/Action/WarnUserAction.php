<?php

namespace Tapao\ModerationAI\Action;

class WarnUserAction
{
    public function execute(mixed $user): void
    {
        if (!$user) return;
        // Send a Flarum notification to the user
        // (Implement a proper Flarum Notification class for this)
        // For now: log it
        error_log("ModerationAI: User {$user->id} warned for content violation.");
    }
}
