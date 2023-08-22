<?php

namespace App\Http\Controllers;

use App\Models\PrecioUnitario;
use App\Models\TipoEtiqueta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrecioUnitarioController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', PrecioUnitario::class);
        $precios = PrecioUnitario::all();
        return Inertia::render('Administracion/PreciosUnitarios/Index', $precios->map(function ($precioUnitario) {
            dd($precioUnitario);
            return array_merge($precioUnitario->toArray());
        }));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $this->authorize('create', PrecioUnitario::class);

        $tipoEtiquetas = TipoEtiqueta::all();

        return Inertia::render('Administracion/PreciosUnitarios/Create', ['tipoEtiquetas' => $tipoEtiquetas]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $this->authorize('create', PrecioUnitario::class);
    }

    /**
     * Display the specified resource.
     */
    public function show(PrecioUnitario $precioUnitario) {
        $this->authorize('view', $precioUnitario);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PrecioUnitario $precioUnitario) {
        $this->authorize('update', $precioUnitario);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PrecioUnitario $precioUnitario) {
        $this->authorize('update', $precioUnitario);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PrecioUnitario $precioUnitario) {
        $this->authorize('delete', $precioUnitario);
    }
}
