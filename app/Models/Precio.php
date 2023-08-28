<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Precio extends Model {
    use HasFactory;

    // Vamos a manejar los fecha_desde y fecha_hasta a manopla
    public $timestamps = false;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = ['medida','cantidad_colores','precio'];

    public static function getUltimoPrecio(
        int $tipo_etiqueta_id,
        int $medida,
        int $cantidad_colores
    ): self | null {
        return self::where('tipo_etiqueta_id', $tipo_etiqueta_id)
            ->with('tipoEtiqueta')
            ->whereNull('fecha_hasta')
            ->where('medida', $medida)
            ->where('cantidad_colores', $cantidad_colores)
            ->first();
    }

    /**
    * Obtener el tipo de etiqueta asociado con el precio unitario
    */
    public function tipoEtiqueta(): BelongsTo {
        return $this->belongsTo(TipoEtiqueta::class);
    }
}
