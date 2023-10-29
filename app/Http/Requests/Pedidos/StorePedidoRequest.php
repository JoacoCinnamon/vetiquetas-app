<?php

namespace App\Http\Requests\Pedidos;

use App\Enums\Pedidos\PedidoEstado;
use App\Enums\Pedidos\TipoEntrega;
use App\Models\Pedido;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StorePedidoRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array {
        return [
            'descripcion' => ['required', 'string', 'max:255'],
            'disenio_id' => [
                'required',
                'exists:diseños,id',
                function ($attribute, $value, $fail) {
                    // Verifica si existen pedidos pendientes con estado 1 para el diseño dado.
                    $existingPedido = Pedido::where('disenio_id', $value)
                        ->where('estado', PedidoEstado::Pedido)
                        ->first();

                    if ($existingPedido) {
                        $fail('El diseño tiene pedidos pendientes. No puede hacer más pedidos para ese diseño.');
                    }
                },
            ],
            'fecha_prevista' => ['required', 'date'],
            'tipo_entrega' => ['required', new Enum(TipoEntrega::class)],
            'cantidad' => ['required', 'numeric', 'integer', 'min:1500'],
        ];
    }
}
