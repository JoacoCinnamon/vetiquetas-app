<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PrecioUnitario extends Model {
    use HasFactory;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = ['ancho','cantidadDeColores','precio'];

    /**
    * Obtener el tipo de etiqueta asociado con el precio unitario
    */
    public function tipoEtiqueta(): HasOne {
        return $this->hasOne(TipoEtiqueta::class);
    }
}
