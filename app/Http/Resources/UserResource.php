<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
    * The "data" wrapper that should be applied.
    *
    * @var string|null
    */
    public static $wrap = 'user';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellido' => $this->apellido,
            'documento' => $this->documento,
            'tipo_documento' => $this->tipo_documento->value,
            'cuit_cuil' => $this->cuit_cuil,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'isAdmin' => $this->isAdmin(),
        ];
    }
}
