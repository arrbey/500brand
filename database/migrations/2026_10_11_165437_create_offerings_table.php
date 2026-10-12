<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offerings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->cascadeOnDelete();
            $table->string('type', 100); // Produk fisik, Jasa, Produk digital, etc.
            $table->string('name', 160)->nullable();
            $table->string('category', 100)->nullable();
            $table->text('description')->nullable();
            // Sudah mempunyai brand | Brand sedang dikembangkan | Belum mempunyai brand | Tidak relevan
            $table->string('brand_status', 60)->nullable();
            $table->string('brand_name', 160)->nullable();
            // Belum aktif | Lokal | Regional | Nasional | Sudah internasional
            $table->string('current_market', 60)->nullable();
            $table->text('market_plan')->nullable();
            $table->timestamps();

            $table->index('type');
            $table->index('brand_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offerings');
    }
};
