<?php

namespace App\Http\Controllers;

use App\Enums\Pedidos\PedidoEstado;
use App\Enums\Pedidos\TipoEntrega;
use App\Http\Requests\Pedidos\UpdatePedidoRequest;
use App\Http\Requests\Pedidos\StorePedidoRequest;
use App\Models\Disenio;
use App\Models\Pedido;
use App\Models\Precio;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class PedidoController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', Pedido::class);

        if (auth()->user()->isAdmin()) {
            return Inertia::render('Administracion/Pedidos', [
                'pedidos' => fn () => Pedido::withTrashed()
                    ->orderBy('fecha_entrega')
                    ->orderBy('fecha_pedido')
                    ->get()
                    ->load(['diseño', 'user:id,nombre,apellido']),
            ]);
        }

        $pedidos =  Pedido::forCurrentUser();
        return Inertia::render('Pedidos/Index', [
            'pedidos' => fn () => $pedidos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $this->authorize('create', Pedido::class);

        if (auth()->user()->diseños()->count() === 0) {
            // Flashear en la sesión que no tiene ningún diseño
            return to_route('disenios.create');
        }

        $disenios = auth()->user()->diseños()->get()?->load('colores', 'tipoEtiqueta');
        $precios = Precio::lastPricesForTipoEtiqueta($disenios->pluck('tipo_etiqueta_id'))->get();

        return Inertia::render('Pedidos/Create', [
            'precios' => fn () => $precios,
            'diseños' => fn () => $disenios,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePedidoRequest $request) {
        $this->authorize('create', Pedido::class);

        $disenio = Disenio::query()->where('id', $request->validated('disenio_id'))->first();
        $tipoEntrega = TipoEntrega::from($request->validated('tipo_entrega'));
        $precio = Precio::getUltimoPrecio(
            tipo_etiqueta_id: $disenio->tipo_etiqueta_id,
            medida: $disenio->ancho,
            cantidad_colores: $disenio->colores()->count()
        );

        $precioUnitario = ($precio->precio * $tipoEntrega->aumento()) / (1000 / $disenio->ancho);
        $precioTotal = $precioUnitario * $request->validated('cantidad');

        $request->user()->pedidos()->create([
            'descripcion' => $request->validated('descripcion'),
            'disenio_id' => $disenio->id,
            'precio_id' => $precio->id,
            'precio' => $precioTotal,
            'cantidad' => $request->validated('cantidad'),
            'tipo_entrega' => $tipoEntrega->value,
            'fecha_prevista' => $request->validated('fecha_prevista'),
        ]);

        return to_route('pedidos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido) {
        $this->authorize('view', $pedido);
    }

    public function stream(int $id) {
        $pedido = Pedido::withTrashed()->find($id);
        $user = auth()->user();
        abort_unless($user->isAdmin() || $user->id == $pedido->user_id, 404);

        $pedido->load(['diseño' => ['tipoEtiqueta', 'colorFondo', 'colores']]);
        $pdf = Pdf::loadView('pdf', ['pedido' => $pedido]);
        return $pdf->stream('pedido.pdf');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePedidoRequest $request, Pedido $pedido) {
        $this->authorize('update', $pedido);

        $nuevoEstado = PedidoEstado::from($request->validated('estado'));

        if (in_array($nuevoEstado->value, $pedido->estado->estadosPosibles())) {
            $pedido->update(['estado' => $nuevoEstado->value]);

            if ($nuevoEstado === PedidoEstado::Entregado) {
                $pedido->update(['fecha_entrega' => now()]);
            }
        }


        return to_route('pedidos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido) {
        $this->authorize('delete', $pedido);

        // Si ya comenzó el procesado del pedido no se puede cancelar
        if ($pedido->estado === PedidoEstado::Pedido) {
            $pedido->update([
                'estado' => PedidoEstado::Cancelado->value
            ]);
            $pedido->delete();
        }

        return to_route('pedidos.index');
    }
}
