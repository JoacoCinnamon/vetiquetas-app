<?php

namespace App\Observers;

use App\Models\Pedido;
use App\Services\Pedidos\PedidoCreatePDF;
use App\Services\PedidoService;
use Illuminate\Support\Str;

class PedidoObserver {
    public function __construct(protected PedidoService $pedidoService) {
    }

    public function creating(Pedido $pedido): void {
        $pedido->uuid = Str::uuid();
    }

    public function created(Pedido $pedido): void {
        PedidoCreatePDF::createAndStore($pedido);
    }
}
