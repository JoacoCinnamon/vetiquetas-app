<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('color_diseño', function (Blueprint $table) {
            $table->foreignId('color_id')->constrained('colores');
            $table->foreignId('diseño_id')->constrained('diseños');

            $table->primary(['color_id', 'diseño_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('color_diseño');
    }
};
