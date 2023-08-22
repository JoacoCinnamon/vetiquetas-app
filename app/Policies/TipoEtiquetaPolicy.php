<?php

namespace App\Policies;

use App\Enums\Permisos;
use App\Models\TipoEtiqueta;
use App\Models\User;

class TipoEtiquetaPolicy {
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool {
        return $user->hasPermissionTo(Permisos::VerTiposEtiquetas->value);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TipoEtiqueta $tipoEtiqueta): bool {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool {
        return $user->hasPermissionTo(Permisos::CrearTiposEtiquetas->value);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TipoEtiqueta $tipoEtiqueta): bool {
        return $user->hasPermissionTo(Permisos::ActualizarTiposEtiquetas->value);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TipoEtiqueta $tipoEtiqueta): bool {
        return $user->hasPermissionTo(Permisos::BorrarTiposEtiquetas->value);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TipoEtiqueta $tipoEtiqueta): bool {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TipoEtiqueta $tipoEtiqueta): bool {
        return false;
    }
}
