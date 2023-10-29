<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColoresSeeder extends Seeder {
    public function run() {
        $colores = [
        ['nombre' => 'Blanco', 'codigo' => '010', 'hex' => 'FFFFFF'],
        ['nombre' => 'Hueso', 'codigo' => '012', 'hex' => 'FCF8E2'],
        ['nombre' => 'Beige Claro', 'codigo' => '709', 'hex' => 'EDE1DA'],
        ['nombre' => 'Gris Claro', 'codigo' => '903', 'hex' => 'CCCCCC'],
        ['nombre' => 'Gris Medio', 'codigo' => '904', 'hex' => '999999'],
        ['nombre' => 'Gris Oscuro', 'codigo' => '940', 'hex' => '666666'],
        ['nombre' => 'Amarillo Oro', 'codigo' => '280', 'hex' => 'FFD812'],
        ['nombre' => 'Amarillo Huevo', 'codigo' => '284', 'hex' => 'FFFF66'],
        ['nombre' => 'Verde Manzana', 'codigo' => '423', 'hex' => '00FF00'],
        ['nombre' => 'Verde Italiano', 'codigo' => '430', 'hex' => '17B517'],
        ['nombre' => 'Verde Cardon', 'codigo' => '470', 'hex' => '007300'],
        ['nombre' => 'Beige Champain', 'codigo' => '701', 'hex' => 'FFDCB8'],
        ['nombre' => 'Maiz', 'codigo' => '275', 'hex' => 'FFC803'],
        ['nombre' => 'Rosa Bebe', 'codigo' => '506', 'hex' => 'FFC4E5'],
        ['nombre' => 'Rosa Chicle', 'codigo' => '530', 'hex' => 'FF3D9E'],
        ['nombre' => 'Fuxia', 'codigo' => '580', 'hex' => 'D4006A'],
        ['nombre' => 'Rojo', 'codigo' => '503', 'hex' => 'Ff0000'],
        ['nombre' => 'Bordo', 'codigo' => '590', 'hex' => 'Ad0600'],
        ['nombre' => 'Lila', 'codigo' => '820', 'hex' => 'D0BDFF'],
        ['nombre' => 'Violeta', 'codigo' => '824', 'hex' => '7D00A6'],
        ['nombre' => 'Verde Militar', 'codigo' => '490', 'hex' => '85853D'],
        ['nombre' => 'Celeste Claro', 'codigo' => '810', 'hex' => '00CCFF'],
        ['nombre' => 'Azul Francia', 'codigo' => '882', 'hex' => '1946FC'],
        ['nombre' => 'Turqueza', 'codigo' => '440', 'hex' => '00B1F2'],
        ['nombre' => 'Azul Marino', 'codigo' => '890', 'hex' => '0039DF'],
        ['nombre' => 'Naraja', 'codigo' => '265', 'hex' => 'FF4C00'],
        ['nombre' => 'Marron', 'codigo' => '700', 'hex' => '663300'],
        ['nombre' => 'Negro', 'codigo' => '900', 'hex' => '000000'],
        ['nombre' => 'Beige Militar', 'codigo' => '730', 'hex' => 'D1BEAB'],
        ];

        Color::insert($colores);
    }
}
