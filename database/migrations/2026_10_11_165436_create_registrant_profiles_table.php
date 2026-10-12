<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrant_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->cascadeOnDelete();
            $table->string('full_name', 120);
            $table->string('email', 160);
            $table->string('whatsapp', 25); // as entered
            $table->string('whatsapp_e164', 20)->nullable(); // +62...
            $table->string('province_code', 10)->nullable();
            $table->string('province_name', 100);
            $table->string('city_code', 10)->nullable();
            $table->string('city_name', 100);
            $table->string('category_code', 80);
            $table->string('category_label', 120);
            $table->string('role_title', 120)->nullable();
            $table->timestamps();

            $table->index('email');
            $table->index('province_code');
            $table->index('category_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrant_profiles');
    }
};
