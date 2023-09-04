<?php

namespace App\Http\Controllers;

use App\Models\TipoEtiqueta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CotizarController extends Controller {
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request) {
        return Inertia::render('Cotizar', [
            'tipoEtiquetas' => fn () => TipoEtiqueta::ultimosPrecios()->toArray(),
        ]);
    }
}
