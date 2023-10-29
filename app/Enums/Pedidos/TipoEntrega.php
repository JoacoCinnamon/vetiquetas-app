<?php

namespace App\Enums\Pedidos;

enum TipoEntrega: int {
    case Rollo = 1;
    case RolloApresto = 2;
    case Cortada = 3;
    case CortadaApresto = 4;
    case CortadaDobladaMedio = 5;
    case CortadaDobladaPuntas = 6;

    // public static function aumentoFrom(int $tipoEntrega): float {
    //     return match (TipoEntrega::from($tipoEntrega)) {
    //         self::Rollo => 1.0, // En rollo
    //         self::RolloApresto => 1.10, // En rollo + apresto (+10%)
    //         self::Cortada => 1.15, // Cortada (+15%)
    //         self::CortadaApresto => 1.20, // Cortada + apresto (+20%)
    //         self::CortadaDobladaMedio => 1.25, // Cortada y doblada al medio (+25%)
    //         self::CortadaDobladaPuntas => 1.25, // Cortada y doblada en las puntas (+25%)
    //         default => 1.0, // Valor predeterminado en caso de un tipo no reconocido
    //     };
    // }

    public function aumento(): float {
        return match ($this) {
            self::Rollo => 1.0, // En rollo
            self::RolloApresto => 1.10, // En rollo + apresto (+10%)
            self::Cortada => 1.15, // Cortada (+15%)
            self::CortadaApresto => 1.20, // Cortada + apresto (+20%)
            self::CortadaDobladaMedio => 1.25, // Cortada y doblada al medio (+25%)
            self::CortadaDobladaPuntas => 1.25, // Cortada y doblada en las puntas (+25%)
            default => 1.0, // Valor predeterminado en caso de un tipo no reconocido
        };
    }

    /**
     * Return the value of the enum
     */
    public static function values(): array {
        return array_column(self::cases(), 'value');
    }
}
