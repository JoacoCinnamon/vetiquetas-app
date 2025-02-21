<?php

namespace App\Services;

use App\Models\Pedido;

class PedidoService {
    public static function getDataForPdf(Pedido $pedido) {
        $pedido->load(['user', 'diseño' => ['tipoEtiqueta', 'colorFondo', 'colores']]);

        return [
            'id' => $pedido->id,
            'descripcion' => $pedido->descripcion,
            'fecha_pedido' => $pedido->fecha_pedido->format('d/m/Y'),
            'cantidad' => $pedido->cantidad,
            'tipo_entrega' => $pedido->tipo_entrega->label(),

            'user' => [
                'nombre' => $pedido->user->nombre,
                'apellido' => $pedido->user->apellido,
                'email' => $pedido->user->email,
                'cuit_cuil' => $pedido->user->cuit_cuil,
            ],

            'diseño' => $pedido->diseño->toArray(),
            'foto' => $pedido->diseño->foto_path,
        ];
    }
}
