<?php

namespace App\Http\Controllers\Administracion;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administracion\Colores\StoreColorRequest;
use App\Http\Requests\Administracion\Colores\UpdateColorRequest;
use App\Models\Color;
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreColorRequest $request) {
        $this->authorize('create', Color::class);

        $validated = $request->validated();
        Color::create($validated);

        return to_route('administracion.colores.index')->with('success', 'Color creado correctamente');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateColorRequest $request, int $id) {
        $color = Color::find($id);
        $this->authorize('update', $color);

        if (isset($color)) {
            $validated = $request->validated();
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

        if (isset($color)) {
            $color->delete();
        }

        return to_route('administracion.colores.index');
    }
}
