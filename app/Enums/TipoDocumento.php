<?php

namespace App\Enums;

enum TipoDocumento: string {
    case Dni = 'dni';

    /**
     * Return the value of the enum
     */
    public static function values(): array {
        return array_column(self::cases(), 'value');
    }
}
