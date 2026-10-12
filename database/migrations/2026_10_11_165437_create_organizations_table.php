<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->cascadeOnDelete();
            // aktif | persiapan | belum | representatif
            $table->string('operating_status', 30);
            $table->string('name', 160)->nullable();
            $table->string('entity_type', 80)->nullable(); // Perorangan, CV, PT, etc.
            $table->string('sector', 100)->nullable();
            $table->smallInteger('founded_year')->nullable();
            $table->string('scale', 50)->nullable(); // Mikro, Kecil, Menengah, Besar, etc.
            $table->string('website_social', 250)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('operating_status');
            $table->index('sector');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
