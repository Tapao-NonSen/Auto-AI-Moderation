<?php

namespace Tapao\ModerationAI\Action;

class DeleteAction
{
    public function execute(mixed $content): void
    {
        if (method_exists($content, 'delete')) {
            $content->delete();
        }
    }
}
