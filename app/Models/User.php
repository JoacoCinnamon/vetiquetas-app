<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\Roles;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable {
    use HasRoles;
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'apellido',
        // 'documento',
        // 'tipo_documento',
        'cuit_cuil',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // 'tipo_documento' => TipoDocumento::class,
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Accessor/Mutator
    public function cuitCuil(): Attribute {
        return Attribute::make(
            // Lo transforma de la base de datos
            get: fn ($value) => Str::substr($value, 0, 2) . '-' . Str::substr($value, 2, 8) . '-' . Str::substr($value, 10),
            // Lo transforma a la base de datos
            set: fn ($value) => str_replace('-', '', $value)
        );
    }

    public function isAdmin() {
        return $this->hasRole(Roles::Administrador->value);
    }

    public function pedidos(): HasMany {
        return $this->hasMany(Pedido::class);
    }

    public function diseños(): HasMany {
        return $this->hasMany(Disenio::class);
    }
}
