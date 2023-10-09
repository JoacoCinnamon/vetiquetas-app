<?php

namespace Database\Seeders;

use App\Enums\Permisos;
use App\Enums\Roles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder {
    public function run() {
        // Reiniciar los roles y permisos cacheados
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear los permisos
        foreach (Permisos::values() as $name) {
            Permission::create(['name' => $name]);
        }

        // Crear los roles y assignarles los permisos
        Role::create(['name' => Roles::Administrador->value])
            ->givePermissionTo(Permission::all());

        Role::create(['name' => Roles::Usuario->value])->givePermissionTo([
            Permisos::VerPrecios->value,
            Permisos::VerTiposEtiquetas->value,
            Permisos::VerDiseños->value,
            Permisos::CrearDiseños->value,
            Permisos::ActualizarDiseños->value,
            Permisos::BorrarDiseños->value,
            Permisos::VerPedidos->value,
            Permisos::CrearPedidos->value,
            Permisos::BorrarPedidos->value,
        ]);
    }
}
