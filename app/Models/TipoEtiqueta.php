<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoEtiqueta extends Model {
    use HasFactory;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = ['nombre'];

    /**
    * Obtener los tipos de etiquetas por cada precio.
    */
    public function preciosUnitarios(): HasMany {
        return $this->hasMany(PrecioUnitario::class);
    }
}
