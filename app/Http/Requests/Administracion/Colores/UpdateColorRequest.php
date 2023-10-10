<?php

namespace App\Http\Requests\Administracion\Colores;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateColorRequest extends FormRequest {
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
        $id = $this->input('id');
        return [
            'id' => ['required', 'exists:colores,id'],
            'nombre' => [
                'required',
                'string',
                'max:255',
                Rule::unique('colores')->ignore($id),
            ],
            'codigo' => [
                'required',
                'numeric',
                'min:1',
                'max:1000',
                Rule::unique('colores')->ignore($id),
            ],
            'hex' => [
                'required',
                'string',
                Rule::unique('colores')->ignore($id),
                'regex:/^([A-Fa-f0-9]{6})$/',
            ],
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
