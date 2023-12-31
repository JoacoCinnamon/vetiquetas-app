<?php

namespace App\Http\Requests\Auth;

use App\Enums\Roles;
use App\Models\User;
use App\Rules\ValidCuitCuil;
use App\Rules\ValidHCaptcha;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest {
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
            'nombre' => ['required', 'string', 'max:255'],
            'apellido' => ['required', 'string', 'max:255'],
            // 'documento' => ['required', 'string', 'numeric', 'digits_between:7,8'],
            'cuit_cuil' => ['required', 'string', new ValidCuitCuil(), 'unique:' . User::class],
            'direccion' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Password::defaults()],
            'hcaptcha' => [new ValidHCaptcha()]
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array {
        return [
            'cuit_cuil' => 'CUIT/CUIL',
        ];
    }

    /**
     * Attempt to register the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(): User {
        $validatedUser = $this->validated();
        // Elimina el campo del captcha para que no interfiera al crearse
        unset($validatedUser['hcaptcha']);
        $user = User::create($validatedUser);
        $user->syncRoles(Roles::Usuario->value);
        return $user;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void {
        // Básicamente para que por las dudas siempre llegue un cuit-cuil sin guiones a la validacion
        // asegurandonos que por ejemplo sea único en la base de datos (ya que los almacenamos sin guiones)
        $this->merge([
            'cuit_cuil' => str_replace('-', '', $this->cuit_cuil),
        ]);
    }
}
