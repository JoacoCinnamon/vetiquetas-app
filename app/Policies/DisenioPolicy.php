<?php

namespace App\Policies;

use App\Enums\Permisos;
use App\Models\Disenio;
use App\Models\User;

class DisenioPolicy {
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool {
        return $user->hasPermissionTo(Permisos::VerDiseños->value);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Disenio $disenio): bool {
        return $user->hasPermissionTo(Permisos::VertTodosLosDiseños->value) ||
         ($user->hasPermissionTo(Permisos::VerDiseños->value) && $disenio->user->id === $user->id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool {
        return $user->hasPermissionTo(Permisos::CrearDiseños->value);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Disenio $disenio): bool {
        return $user->isAdmin() ||
        ($user->hasPermissionTo(Permisos::ActualizarDiseños->value) && !$disenio->hasPedidos() && $disenio->user->id === $user->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Disenio $disenio): bool {
        return $user->isAdmin() ||
        ($user->hasPermissionTo(Permisos::ActualizarDiseños->value) && !$disenio->hasPedidos() && $disenio->user->id === $user->id);
    }
}
