<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Llamando a los seeders de los roles, permisos y al del usuario administrador
        $this->call(RolesAndPermissionsSeeder::class);
        $this->call(AdminSeeder::class);

        app()->isLocal($this->call(TipoEtiquetasAndPreciosSeeder::class));
    }
}
