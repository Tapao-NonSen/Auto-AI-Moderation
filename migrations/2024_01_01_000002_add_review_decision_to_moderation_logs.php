<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('moderation_logs', function (Blueprint $table) {
            $table->string('review_decision', 16)->nullable()->after('reviewed_at');
            // 'approved' | 'rejected' | null (pending)
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('moderation_logs', function (Blueprint $table) {
            $table->dropColumn('review_decision');
        });
    },
];
