<?php

use App\Http\Controllers\CotizarController;
use App\Http\Controllers\PrecioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TipoEtiquetaController;
use Illuminate\Foundation\Application;
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
});

Route::middleware(['role:admin', 'auth'])->prefix('administracion')->name('administracion.')->group(function () {
    Route::resource('/etiquetas', TipoEtiquetaController::class)->except(['show', 'create', 'edit']);

    Route::resource('/precios', PrecioController::class);
});

require __DIR__ . '/auth.php';
