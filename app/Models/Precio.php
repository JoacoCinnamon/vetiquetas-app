<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Precio extends Model {
    use HasFactory;

    // Vamos a manejar los fecha_desde y fecha_hasta a manopla
    public $timestamps = false;

    protected $guarded = [];

    public function scopeLastPricesForTipoEtiqueta(Builder $query, ...$tipo_etiquetas_id) {
        return $query->whereIn('tipo_etiqueta_id', $tipo_etiquetas_id)->whereNull('fecha_hasta');
    }

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
