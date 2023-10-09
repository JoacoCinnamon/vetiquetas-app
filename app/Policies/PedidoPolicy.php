<?php

namespace App\Policies;

use App\Enums\Permisos;
use App\Models\Pedido;
use App\Models\User;

class PedidoPolicy {
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool {
        return $user->hasPermissionTo(Permisos::VerPedidos->value);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Pedido $pedido): bool {
        return $user->isAdmin() || ($user->hasPermissionTo(Permisos::VerPedidos->value) && $user->id == $pedido->user_id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool {
        return $user->hasPermissionTo(Permisos::CrearPedidos->value);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Pedido $pedido): bool {
        return $user->hasPermissionTo(Permisos::BorrarPedidos->value) && $user->id == $pedido->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Pedido $pedido): bool {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Pedido $pedido): bool {
        return $user->isAdmin();
    }
}
