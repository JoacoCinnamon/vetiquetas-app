<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColoresSeeder extends Seeder {
    public function run() {
        for ($i = 0; $i < 15; $i++) {
            Color::create([
              'nombre' => fake('es_ES')->unique()->safeColorName(),
              'codigo' => fake()->numberBetween(50, 600),
              'hex' => fake('es_ES')->unique()->hexColor(),
            ]);
        }
    }
}
