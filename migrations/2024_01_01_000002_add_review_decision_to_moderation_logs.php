<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('moderation_logs', function (Blueprint $table) {
            // Stores the human reviewer's decision separately from the automated action_taken
            $table->string('review_decision', 16)->nullable()->after('reviewed_at');
            // Possible values: 'approved' (AI was right), 'rejected' (AI was wrong, content restored)
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('moderation_logs', function (Blueprint $table) {
            $table->dropColumn('review_decision');
        });
    },
];
