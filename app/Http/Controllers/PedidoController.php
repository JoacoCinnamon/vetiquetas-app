<?php

namespace App\Http\Controllers;

use App\Http\Pedidos\Requests\StorePedidoRequest as RequestsStorePedidoRequest;
use App\Models\Pedido;

class PedidoController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', Pedido::class);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $this->authorize('create', Pedido::class);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestsStorePedidoRequest $request) {
        $this->authorize('create', Pedido::class);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido) {
        $this->authorize('view', $pedido);
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Pedido $pedido)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(UpdatePedidoRequest $request, Pedido $pedido)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido) {
        //
    }
}
