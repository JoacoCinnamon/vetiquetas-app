<?php

namespace App\Enums\Pedidos;

enum PedidoEstado: int {
    case Pedido = 1;
    case Procesado = 2;
    case Entregado = 3;
    case Cancelado = 4;

    public function estadosPosibles(): array|null {
        return match ($this) {
            self::Pedido => [self::Procesado->value, self::Entregado->value],
            self::Procesado => [self::Entregado->value],
            default => []
        };
    }

    /**
     * Return the value of the enum
     */
    public static function values(): array {
        return array_column(self::cases(), 'value');
    }
}
