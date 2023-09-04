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
        Permission::create(['name' => Permisos::VerPrecios->value]);
        Permission::create(['name' => Permisos::VerHistorialPrecios->value]);
        Permission::create(['name' => Permisos::ActualizarPrecios->value]);

        Permission::create(['name' => Permisos::VerTiposEtiquetas->value]);
        Permission::create(['name' => Permisos::CrearTiposEtiquetas->value]);
        Permission::create(['name' => Permisos::ActualizarTiposEtiquetas->value]);
        Permission::create(['name' => Permisos::BorrarTiposEtiquetas->value]);

        // Crear los roles y assignarles los permisos
        $role = Role::create(['name' => Roles::Administrador->value])
            ->givePermissionTo(Permission::all());

        // tambien se puede concatenar
        $role = Role::create(['name' => Roles::Usuario->value]);
        $role->givePermissionTo([Permisos::VerPrecios->value, Permisos::VerTiposEtiquetas->value]);
    }
}
