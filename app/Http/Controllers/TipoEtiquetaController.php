<?php

namespace App\Http\Controllers;

use App\Models\TipoEtiqueta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipoEtiquetaController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', TipoEtiqueta::class);
        return Inertia::render('Administracion/TipoEtiquetas/Index', [
            'tipo_etiquetas' => TipoEtiqueta::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $this->authorize('create', TipoEtiqueta::class);
        return Inertia::render('Administracion/TipoEtiquetas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $this->authorize('create', TipoEtiqueta::class);

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255', 'unique:' . TipoEtiqueta::class]
        ]);
        TipoEtiqueta::create($validated);

        return Inertia::location(route('administracion.etiquetas.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(TipoEtiqueta $tipoEtiqueta) {
        $this->authorize('view', $tipoEtiqueta);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoEtiqueta $tipoEtiqueta) {
        $this->authorize('update', $tipoEtiqueta);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoEtiqueta $tipoEtiqueta) {
        $this->authorize('update', $tipoEtiqueta);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoEtiqueta $tipoEtiqueta) {
        $this->authorize('delete', $tipoEtiqueta);
    }
}
