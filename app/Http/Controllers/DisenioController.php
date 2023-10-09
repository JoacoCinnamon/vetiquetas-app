<?php

namespace App\Http\Controllers;

use App\Http\Requests\Disenios\DiseniosStoreRequest;
use App\Http\Requests\Disenios\DiseniosUpdateRequest;
use App\Models\Color;
use App\Models\Disenio;
use App\Models\TipoEtiqueta;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DisenioController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $this->authorize('viewAny', Disenio::class);

        $disenios = Disenio::all()?->load('colores', 'tipoEtiqueta')->map(function (Disenio $disenio) {
            return [
                ...$disenio->toArray(),
                'can' => [
                    'editAndDelete' => !$disenio->hasPedidos()
                ]
            ];
        });

        return Inertia::render('Diseños/Index', [
            'diseños' => fn () => $disenios,
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

        return Inertia::render('Diseños/Edit', [
            'tipoEtiquetas' => fn () => TipoEtiqueta::ultimosPrecios()->toArray(),
            'colores' => fn () => Color::all()->toArray(),
            'diseño' => fn () => $disenio->load('colores')->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DiseniosUpdateRequest $request, Disenio $disenio) {
        $this->authorize('update', $disenio);

        DB::beginTransaction();
        try {
            if ($request->hasFile('foto')) {
                // Toda esta triquiñuela para que nos quede solo el /diseños/*.png
                $fotoAnteriorPath = str_replace('/storage', '', parse_url($disenio->foto_path, PHP_URL_PATH));
                $foto_path = $request->file('foto')->store('diseños', 'public');

                // Actualiza el campo de la foto con la nueva ruta
                $disenio->foto_path = asset('storage/' . $foto_path);

                if (Storage::disk('public')->exists($fotoAnteriorPath)) {
                    Storage::disk('public')->delete($fotoAnteriorPath);
                }
            }

            $disenio->nombre = $request->validated('nombre');
            $disenio->tipo_etiqueta_id = $request->validated('tipo_etiqueta_id');
            $disenio->color_fondo_id = $request->validated('color_fondo_id');
            $disenio->ancho = $request->validated('ancho');
            $disenio->largo = $request->validated('largo');

            // Actualiza los colores asociados al diseño
            $nuevosIdColores = array_map(fn ($color) => $color['id'], $request->validated('colores'));
            $disenio->colores()->sync($nuevosIdColores);

            $disenio->save();

            DB::commit();

            return to_route('disenios.index');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::log('info', $e->getMessage());
            return response('Anda como el tuje la edicion del diseño, todavía no se puede.', 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disenio $disenio) {
        $this->authorize('delete', $disenio);

        $disenio->colores()->detach();

        $fotoAnteriorPath = str_replace('/storage', '', parse_url($disenio->foto_path, PHP_URL_PATH));

        if (Storage::disk('public')->exists($fotoAnteriorPath)) {
            Storage::disk('public')->delete($fotoAnteriorPath);
        }

        $disenio->delete();

        return redirect()->route('disenios.index');
    }
}
