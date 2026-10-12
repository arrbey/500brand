<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registration_consents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->cascadeOnDelete();
            // consent_data | consent_stage1_ack | consent_skolah_transfer | consent_marketing
            $table->string('consent_key', 60);
            $table->boolean('consented')->default(false);
            $table->text('consent_text'); // Verbatim text at time of submission
            $table->unsignedSmallInteger('text_version')->default(1);
            $table->string('ip_hash', 64)->nullable();
            $table->timestamp('consented_at')->nullable();
            $table->timestamps();

            $table->index(['registration_id', 'consent_key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_consents');
    }
};
