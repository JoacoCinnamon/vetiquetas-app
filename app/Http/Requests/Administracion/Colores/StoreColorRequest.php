<?php

namespace App\Http\Requests\Administracion\Colores;

use Illuminate\Foundation\Http\FormRequest;

class StoreColorRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array {
        return [
            'nombre' => ['required', 'string', 'max:255', 'unique:colores'],
            'codigo' => ['required', 'numeric', 'min:1', 'max:1000', 'unique:colores'],
            'hex' => ['required', 'string', 'unique:colores', 'regex:/^([A-Fa-f0-9]{6})$/']
        ];
    }

    /*
    * Prepare the data for validation.
    */
    protected function prepareForValidation(): void {
        $this->merge([
            'hex' => substr($this->hex, 1),
        ]);
    }
}
