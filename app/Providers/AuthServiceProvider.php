<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Color;
use App\Models\Precio;
use App\Models\TipoEtiqueta;
use App\Policies\ColorPolicy;
use App\Policies\PrecioPolicy;
use App\Policies\TipoEtiquetaPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider {
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        TipoEtiqueta::class => TipoEtiquetaPolicy::class,
        Precio::class => PrecioPolicy::class,
        Color::class => ColorPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void {
        //
    }
}
