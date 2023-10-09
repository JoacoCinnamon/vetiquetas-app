<?php

namespace App\Http\Controllers\Administracion;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ColorController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', Color::class);

        $colores = Color::all()->map(function (Color $color) {
            return [
                ...$color->toArray(),
                'can' => [
                    'editAndDelete' => !$color->hasDiseños()
                ]
            ];
        });

        return Inertia::render('Administracion/Colores', [
            'colores' => $colores,
        ]);
    }

    // TODO: Remplazar esto con los FormRequest
    protected function cleanHex(Request $request) {
        // Eliminar el carácter '#' del campo 'hex' para que se compare bien en la db
        $request->merge(['hex' => str_replace('#', '', $request->input('hex'))]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $this->authorize('create', Color::class);

        $this->cleanHex($request);
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255', 'unique:' . Color::class],
            'hex' => ['required', 'string', 'unique:' . Color::class, 'regex:/^#([A-Fa-f0-9]{6})$/']
        ]);

        Color::create($validated);

        return to_route('administracion.colores.index')->with('success', 'Color creado correctamente');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id) {
        $color = Color::find($id);
        $this->authorize('update', $color);

        if ($color->hasDiseños()) {
            return redirect()
                ->back()
                ->with('error', 'Este color tiene diseños relacionados y no puede ser editado.');
        }

        if ($color) {
            $this->cleanHex($request);
            $validated = $request->validate([
                'nombre' => ['required','string','max:255',Rule::unique('colores')->ignore($color)],
                'hex' => ['required','string',Rule::unique('colores')->ignore($color), 'regex:/^([A-Fa-f0-9]{6})$/']
            ]);

            $color->update($validated);

            return to_route('administracion.colores.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id) {
        $color = Color::find($id);
        $this->authorize('delete', $color);

        if ($color->hasDiseños()) {
            return redirect()
                ->back()
                ->with('error', 'Este color tiene diseños relacionados y no puede ser eliminado.');
        }
        if ($color) {
            $color->delete();
        }

        return to_route('administracion.colores.index');
    }
}
