<?php

namespace App\Policies;

use App\Models\Color;
use App\Models\User;

class ColorPolicy {
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Color $color): bool {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Color $color): bool {
        return $user->isAdmin() && !$color->hasDiseños();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Color $color): bool {
        return $user->isAdmin() && !$color->hasDiseños();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Color $color): bool {
        return $user->isAdmin();
    }
}
