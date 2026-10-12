<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('public_id', 26)->unique(); // ULID
            $table->string('registration_number', 20)->unique()->nullable(); // PBG-00001
            $table->string('submission_token', 36)->unique(); // UUID anti double-submit
            $table->string('status', 50)->default('Baru');
            // Statuses: Baru, Perlu Pemeriksaan, Perlu Perbaikan Data, Siap Diekspor,
            //           Sudah Diekspor, Terverifikasi Diimpor ke Skolah.com, Diarsipkan
            $table->boolean('is_possible_duplicate')->default(false);
            $table->string('ip_hash', 64)->nullable(); // SHA-256 of IP
            $table->string('user_agent_hash', 64)->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
            $table->index('submitted_at');
            $table->index('is_possible_duplicate');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
