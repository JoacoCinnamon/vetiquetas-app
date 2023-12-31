<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Disenio extends Model {
    use HasFactory;

    public const CREATED_AT = 'creado_el';
    public const UPDATED_AT = 'actualizado_el';

    protected $table = 'diseños';

    protected $guarded = [];

    public function hasPedidos(): bool {
        return $this->pedidos()->count() > 0;
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function tipoEtiqueta(): BelongsTo {
        return $this->belongsTo(TipoEtiqueta::class);
    }

    public function pedidos(): HasMany {
        return $this->hasMany(Pedido::class);
    }

    public function colorFondo(): BelongsTo {
        return $this->belongsTo(Color::class, 'color_fondo_id', 'id');
    }

    public function colores(): BelongsToMany {
        return $this->belongsToMany(Color::class, 'color_diseño', 'diseño_id', 'color_id');
    }
}
