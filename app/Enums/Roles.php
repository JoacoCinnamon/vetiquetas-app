<?php

namespace App\Enums;

enum Roles: string {
    case Administrador = 'admin';
    case Usuario = 'user';

    /**
     * Return the value of the enum
     */
    public static function values(): array {
        return array_column(self::cases(), 'value');
    }
}
