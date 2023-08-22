<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('precio_unitarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_etiqueta_id')
            ->constrained('tipo_etiquetas')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->float('ancho');
            $table->integer('cantidad_colores');
            $table->float('precio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('precio_unitarios');
    }
};
