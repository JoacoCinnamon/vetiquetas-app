<?php

use App\Models\TipoEtiqueta;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('precios', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(TipoEtiqueta::class)
            ->constrained('tipo_etiquetas')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->float('medida');
            $table->integer('cantidad_colores');
            $table->decimal('precio');
            $table->timestamp('fecha_desde')->useCurrent();
            $table->timestamp('fecha_hasta')->default(null)->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('precios');
    }
};
