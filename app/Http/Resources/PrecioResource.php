<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrecioResource extends JsonResource {
    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = 'precio';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'medida' => $this->medida,
            'cantidadColores' => $this->cantidad_colores,
            'precio' => $this->precio,
            'tipoEtiqueta' => $this->whenLoaded('tipo_etiqueta_id'),
            'fecha_desde' => $this->fecha_desde,
            'fecha_hasta' => $this->fecha_hasta,
        ];
    }
}
