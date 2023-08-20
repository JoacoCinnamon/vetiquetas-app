<?php

use App\Enums\TipoDocumento;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("users", function (Blueprint $table) {
            $table->renameColumn("name", "nombre");
            $table->string("apellido");
            $table->string("documento");
            $table->enum("tipo_documento", TipoDocumento::values())->default(TipoDocumento::Dni->value);
            $table->string("cuit_cuil");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("users", function (Blueprint $table) {
            $table->renameColumn("nombre", "name");
            $table->dropColumn(["apellido", "documento", "tipo_documento", "cuit_cuil"]);
        });
    }
};
