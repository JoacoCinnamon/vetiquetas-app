<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Disenio extends Model {
    use HasFactory;

    public const CREATED_AT = 'creado_el';
    public const UPDATED_AT = 'actualizado_el';

    protected $table = 'diseños';

    protected $guarded = [];


    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function tipoEtiqueta(): BelongsTo {
        return $this->belongsTo(TipoEtiqueta::class);
    }

    public function colores(): BelongsToMany {
        return $this->belongsToMany(Color::class, 'color_diseño', 'diseño_id', 'color_id');
    }
}
