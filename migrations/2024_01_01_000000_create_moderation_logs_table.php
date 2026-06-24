<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('moderation_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->enum('content_type', ['post', 'discussion', 'user', 'tag', 'poll', 'bio', 'upload']);
            $table->unsignedBigInteger('content_id');
            $table->string('field', 64);
            $table->string('openai_model', 64);
            $table->boolean('flagged')->default(false);
            $table->json('categories')->nullable();
            $table->json('category_scores')->nullable();
            $table->string('action_taken', 32)->nullable();
            $table->unsignedBigInteger('reviewed_by')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->string('content_hash', 64)->nullable();
            $table->boolean('webhook_sent')->default(false);
            $table->timestamps();
            $table->index(['content_type', 'content_id']);
            $table->index(['flagged', 'created_at']);
            $table->index(['action_taken', 'reviewed_at']);
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('moderation_logs');
    },
];
