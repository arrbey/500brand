<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registration_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->cascadeOnDelete();
            $table->string('question_key', 80); // 'goals', 'expectation'
            $table->text('answer_value');
            $table->boolean('is_primary')->default(false); // for goals: which is the primary
            $table->timestamps();

            $table->index(['registration_id', 'question_key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_answers');
    }
};
