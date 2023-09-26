<?php

use App\Models\Color;
use App\Models\TipoEtiqueta;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('diseños', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)
            ->constrained()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignIdFor(TipoEtiqueta::class)
            ->constrained('tipo_etiquetas')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('nombre');
            $table->float('ancho');
            $table->float('largo');
            // Color de fondo
            $table->foreignId('color_fondo_id')
            ->constrained('colores')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('foto_path');
            $table->timestamp('creado_el')->useCurrent();
            $table->timestamp('actualizado_el')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('diseños');
    }
};
