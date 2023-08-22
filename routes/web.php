<?php

use App\Http\Controllers\PrecioUnitarioController;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'edit'])->name('perfil.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('perfil.update');
});

Route::middleware(['role:admin'])->prefix('administracion')->name('administracion.')->group(function () {
    Route::resource('/etiquetas', TipoEtiquetaController::class);
    Route::resource('/precios', PrecioUnitarioController::class);
});

require __DIR__ . '/auth.php';
