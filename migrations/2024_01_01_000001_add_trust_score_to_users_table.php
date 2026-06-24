<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->unsignedTinyInteger('moderation_trust_score')->default(50)->after('last_seen_at');
            // 0 = always sync+strict, 100 = skip moderation (trusted)
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('moderation_trust_score');
        });
    },
];
