<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TipoEtiquetaResource extends JsonResource {
    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = 'tipo_etiqueta';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'creado_el' => $this->creado_el,
            'actualizado_el' => $this->actualizado_el,
        ];
    }
}
