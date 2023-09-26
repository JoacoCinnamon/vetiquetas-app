<?php

namespace App\Http\Controllers;

use App\Http\Requests\Disenios\DiseniosStoreRequest;
use App\Models\Color;
use App\Models\Disenio;
use App\Models\TipoEtiqueta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisenioController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', Disenio::class);

        return Inertia::render('Diseños/Index', [
            'diseños' => fn () => Disenio::all()?->load('colores', 'tipoEtiqueta')->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $this->authorize('create', Disenio::class);

        return Inertia::render('Diseños/Create', [
            'tipoEtiquetas' => fn () => TipoEtiqueta::ultimosPrecios()->toArray(),
            'colores' => fn () => Color::all()->toArray(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DiseniosStoreRequest $request) {
        $this->authorize('create', Disenio::class);

        $foto_path = $request->file('foto')->store('diseños', 'public');
        // 'diseños' es el directorio dentro de 'storage/app/public' donde se almacenará la imagen
        // Esta función almacena la imagen y devuelve la ruta relativa al archivo

        $disenio = Disenio::create([
            'user_id' => $request->user()->id,
            'nombre' => $request->validated('nombre'),
            'tipo_etiqueta_id' => $request->validated('tipo_etiqueta_id'),
            'color_fondo_id' => $request->validated('color_fondo_id'),
            'ancho' => $request->validated('ancho'),
            'largo' => $request->validated('largo'),
            'foto_path' => asset('storage/' . $foto_path)
        ]);

        foreach ($request->validated('colores') as $index => $colorId) {
            $disenio->colores()->attach($colorId);
        }

        return to_route('disenios.index');
    }
    /**
     * Display the specified resource.
     */
    public function show(Disenio $disenio) {
        $this->authorize('show', $disenio);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Disenio $disenio) {
        $this->authorize('update', $disenio);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Disenio $disenio) {
        $this->authorize('update', $disenio);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disenio $disenio) {
        $this->authorize('delete', $disenio);
    }
}
