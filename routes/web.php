<?php

use App\Http\Controllers\CotizarController;
use App\Http\Controllers\DisenioController;
use App\Http\Controllers\Administracion\PrecioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Administracion\TipoEtiquetaController;
use App\Http\Controllers\Administracion\ColorController;
use App\Http\Controllers\PedidoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
})->name('root');

Route::get('/cotizar', CotizarController::class)->name('cotizar');

Route::get('/inicio', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('inicio');

Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'edit'])->name('perfil.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('perfil.update');

    Route::resource('/disenios', DisenioController::class);
    Route::resource('/pedidos', PedidoController::class);
});

Route::middleware(['role:admin', 'auth'])->prefix('administracion')->name('administracion.')->group(function () {
    Route::resource('/etiquetas', TipoEtiquetaController::class)->except(['show', 'create', 'edit']);

    Route::post('/precios/aumentar', [PrecioController::class, 'aumentar'])->name('precios.aumentar');
    Route::resource('/precios', PrecioController::class);

    Route::resource('/colores', ColorController::class)->except(['show', 'create', 'edit']);
});

require __DIR__ . '/auth.php';
