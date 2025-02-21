<?php

namespace App\Observers;

use App\Mail\PedidoCreatedMail;
use App\Models\Pedido;
use App\Services\PedidoService;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PedidoObserver {
    public function __construct(protected PedidoService $pedidoService) {
    }

    public function creating(Pedido $pedido): void {
        $pedido->uuid = Str::uuid();
    }

    public function created(Pedido $pedido): void {
        Mail::to(env('ADMIN_USER_MAIL'))
            ->bcc(env('USER_BCC_MAIL_PEDIDOS'))
            ->send(new PedidoCreatedMail($pedido));
    }
}
