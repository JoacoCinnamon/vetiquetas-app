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

    /**
     * Return the value of the enum
     */
    public static function values(): array {
        return array_column(self::cases(), 'value');
    }
}
