<?php

use App\Enums\Pedidos\PedidoEstado;
use App\Enums\Pedidos\TipoEntrega;
use App\Models\Disenio;
use App\Models\Precio;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion', 255);
            $table->foreignIdFor(User::class)
            ->constrained()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignIdFor(Disenio::class)
            ->constrained('diseños');
            $table->foreignIdFor(Precio::class)
            ->constrained();

            $table->unsignedDecimal('precio');
            $table->unsignedInteger('cantidad');

            $table->enum('estado', PedidoEstado::values())->default(PedidoEstado::Pedido->value);
            $table->enum('tipo_entrega', TipoEntrega::values())->default(TipoEntrega::Rollo->value);

            $table->timestamp('fecha_pedido')->useCurrent();
            $table->date('fecha_prevista');
            $table->date('fecha_entrega')->default(null)->index();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('pedidos');
    }
};
