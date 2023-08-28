<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoEtiqueta extends Model {
    use HasFactory;

    public const CREATED_AT = 'creado_el';
    public const UPDATED_AT = 'actualizado_el';

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = ['nombre'];

    public static function ultimosPrecios() {
        return self::with(['precios' => function ($query) {
            $query->whereNull('fecha_hasta');
        }])->get();
    }

    /**
    * Obtener los precios del tipo de etiqueta.
    */
    public function precios(): HasMany {
        return $this->hasMany(Precio::class);
    }
}
