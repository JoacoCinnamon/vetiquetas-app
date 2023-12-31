<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('tipo_etiquetas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->timestamp('creado_el')->useCurrent();
            $table->timestamp('actualizado_el')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('tipo_etiquetas');
    }
};
