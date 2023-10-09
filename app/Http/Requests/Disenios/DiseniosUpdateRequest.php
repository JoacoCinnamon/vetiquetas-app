<?php

namespace App\Http\Requests\Disenios;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class DiseniosUpdateRequest extends FormRequest {
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'tipo_etiqueta_id' => ['required', 'numeric', 'exists:tipo_etiquetas,id'],
            'color_fondo_id' => ['required', 'numeric', 'exists:colores,id'],
            'colores' => ['required', 'array', 'min:1', 'max:4'],
            'colores.*.id' => ['required', 'numeric', 'exists:colores,id'],
            'ancho' => ['required', 'numeric', 'min:12', 'max:60'],
            'largo' => ['required', 'numeric', 'min:2', 'max:300'],
            'foto' => ['nullable', File::image()->max('3mb')]
        ];
    }

    public function messages(): array {
        return [
            'colores.*.id.required' => 'El color :position es requerido',
            'colores.*.id.numeric' => 'El color debe ser un número válido',
            'colores.*.id.exists' => 'El color no existe'
        ];
    }
}
