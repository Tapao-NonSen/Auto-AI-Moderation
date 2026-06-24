<?php

namespace Tapao\ModerationAI\Action;

class HideAction
{
    public function execute(mixed $content): void
    {
        if (method_exists($content, 'hide')) {
            $content->hide();
        } elseif (property_exists($content, 'is_hidden')) {
            $content->is_hidden = true;
        }
        $content->save();
    }
}
