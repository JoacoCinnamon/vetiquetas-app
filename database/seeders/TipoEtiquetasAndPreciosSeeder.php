<?php

namespace Database\Seeders;

use App\Models\TipoEtiqueta;
use Illuminate\Database\Seeder;

class TipoEtiquetasAndPreciosSeeder extends Seeder {
    private static $MEDIDAS = [12, 16, 20, 25, 33, 40, 50, 60];
    private static $CANTIDAD_COLORES = [1, 2, 3, 4, 5, 6, 7];


    // php artisan db:seed --class=Database\Seeders\TipoEtiquetasAndPreciosSeeder
    public function run() {
        $etiquetaTest = TipoEtiqueta::query()->where('nombre', 'Etiqueta Test')->first();
        $etiquetaTest?->precios()->where('id', $etiquetaTest->id)->delete();
        $etiquetaTest?->delete();

        // Crear un tipo de etiqueta cualquiera
        $tipoEtiqueta = TipoEtiqueta::create(['nombre' => 'Etiqueta Test']);

        // Y ahora cargar todos los precios para este tipo de etiqueta
        // todas las medidas y cantidad de colores
        $precio = 20;
        foreach (self::$MEDIDAS as $medida) {
            $precio *= 1.06;
            foreach (self::$CANTIDAD_COLORES as $cantidadColores) {
                $precio *= 1.02;
                $tipoEtiqueta->precios()->create([
                    'medida' => $medida,
                    'cantidad_colores' => $cantidadColores,
                    'precio' => $precio
                ]);
            }
        }
    }
}
