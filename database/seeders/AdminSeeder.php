<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        // Crear un usuario Administrador predeterminado
        User::create([
            'nombre' => 'admin',
            'apellido' => 'administrador',
            'email' => 'admin@example.com',
            'documento' => '44460653',
            'tipo_documento' => 'dni',
            'cuit_cuil' => '20444606534',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ])->assignRole(Role::all());
    }
}
