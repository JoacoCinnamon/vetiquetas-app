<?php

namespace App\Enums;

enum Permisos: string {
    case VerPrecios = 'ver precios';
    case VerHistorialPrecios = 'ver historial precios';
    case ActualizarPrecios = 'actualizar precios';

    case VerTiposEtiquetas = 'ver tipos etiquetas';
    case CrearTiposEtiquetas = 'crear tipos etiquetas';
    case ActualizarTiposEtiquetas = 'actualizar tipos etiquetas';
    case BorrarTiposEtiquetas = 'borrar tipos etiquetas';

    case VerDiseños = 'ver diseños';
    case VertTodosLosDiseños = 'ver todos los diseños';
    case CrearDiseños = 'crear diseños';
    case ActualizarDiseños = 'actualizar diseños';
    case BorrarDiseños = 'borrar diseños';

    case VerPedidos = 'ver pedidos';
    case VerTodosLosPedidos = 'ver todos los pedidos';
    case CrearPedidos = 'crear pedidos';
    case ActualizarPedidos = 'actualizar pedidos';
    case BorrarPedidos = 'borrar pedidos';

    /**
     * Return the value of the enum
     */
    public static function values(): array {
        return array_column(self::cases(), 'value');
    }
}
