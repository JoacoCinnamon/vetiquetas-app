<?php

namespace App\Http\Controllers\Administracion;

use App\Http\Controllers\Controller;
use App\Models\TipoEtiqueta;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TipoEtiquetaController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', TipoEtiqueta::class);
        return Inertia::render('Administracion/TipoEtiquetas', [
            'tipo_etiquetas' => TipoEtiqueta::all(),
        ]);
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

        return to_route('administracion.etiquetas.index')->with('success', 'Tipo etiqueta creado correctamente');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id) {
        $tipoEtiqueta = TipoEtiqueta::find($id);
        $this->authorize('update', $tipoEtiqueta);

        if ($tipoEtiqueta) {
            $validated = $request->validate([
                'nombre' => ['required','string','max:255',Rule::unique('tipo_etiquetas')->ignore($tipoEtiqueta)]
            ]);

            $tipoEtiqueta->update($validated);

            return to_route('administracion.etiquetas.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id) {
        $tipoEtiqueta = TipoEtiqueta::find($id);
        $this->authorize('delete', $tipoEtiqueta);

        if ($tipoEtiqueta) {
            $tipoEtiqueta->delete();
        }

        return to_route('administracion.etiquetas.index');
    }
}
