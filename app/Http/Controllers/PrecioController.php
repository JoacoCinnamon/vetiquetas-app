<?php

namespace App\Http\Controllers;

use App\Models\Precio;
use App\Models\TipoEtiqueta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrecioController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', Precio::class);
        $precios = Precio::all()->load('tipoEtiqueta:id,nombre');
        return Inertia::render('Administracion/Precios/Index', [
            'precios' => fn () => $precios->toArray()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $this->authorize('create', Precio::class);
        return Inertia::render('Administracion/Precios/Create', [
            'tipoEtiquetas' => fn () => TipoEtiqueta::ultimosPrecios()->toArray(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $this->authorize('create', Precio::class);

        $validated = $request->validate([
            'tipo_etiqueta_id' => ['required', 'numeric', 'exists:'.TipoEtiqueta::class.',id'],
            'medida' => ['required', 'numeric','between:10,110'],
            'cantidad_colores' => ['required', 'numeric', 'between:1,7'],
            'precio' => ['required', 'numeric', 'between:0.1,100'],
        ]);

        $precioNuevo = new Precio(
            [
            'medida' => $validated['medida'],
            'cantidad_colores' => $validated['cantidad_colores'],
            'precio' => $validated['precio'],
            ]
        );
        $ultimoPrecio = Precio::getUltimoPrecio(
            $validated['tipo_etiqueta_id'],
            $precioNuevo->medida,
            $precioNuevo->cantidad_colores,
        );

        if (!is_null($ultimoPrecio)) {
            $ultimoPrecio->fecha_hasta = now();
            $ultimoPrecio->save();
        }

        TipoEtiqueta::find($validated['tipo_etiqueta_id'])
            ->precios()
            ->save($precioNuevo);


        return to_route('administracion.precios.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Precio $precio) {
        $this->authorize('view', $precio);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Precio $precio) {
        $this->authorize('update', $precio);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Precio $precio) {
        $this->authorize('update', $precio);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Precio $precio) {
        $this->authorize('delete', $precio);
    }
}
