<?php

use App\Providers\RouteServiceProvider;
use Database\Seeders\RolesAndPermissionsSeeder;

use function Pest\Laravel\{get, post, assertAuthenticated, assertGuest, seed};

test('registration screen can be rendered', function () {
    $response = get('/registrar');

    $response->assertStatus(200);
});

test('new users can register', function () {
    seed(RolesAndPermissionsSeeder::class);

    $response = post('/registrar', [
        'nombre' => 'Test Name',
        'apellido' => 'Test Lastname',
        'documento' => '44460653',
        'cuit_cuil' => '20-44460653-4',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    assertAuthenticated();
    $response->assertRedirect(auth()->user()?->isAdmin() ? route('administracion.dashboard') : RouteServiceProvider::HOME);
});

test('invalid user cuit_cuil is rejected', function () {
    $response = post('/registrar', [
        'nombre' => 'Test Name',
        'apellido' => 'Test Lastname',
        'documento' => '44460653',
        'cuit_cuil' => '2740139454', // invalid
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors(['cuit_cuil']);
    assertGuest();
});
