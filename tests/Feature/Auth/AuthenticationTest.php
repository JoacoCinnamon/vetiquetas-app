<?php

use App\Models\User;
use App\Providers\RouteServiceProvider;

use function Pest\Laravel\{assertAuthenticated, assertGuest, get, post};

test("login screen can be rendered", function () {
    $response = get("/iniciar-sesion");

    $response->assertStatus(200);
});

test("users can authenticate using the login screen", function () {
    $user = User::factory()->create();

    $response = post("/iniciar-sesion", [
        "email" => $user->email,
        "password" => "password",
    ]);

    assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::HOME);
});

test("users can not authenticate with invalid password", function () {
    $user = User::factory()->create();

    post("/iniciar-sesion", [
        "email" => $user->email,
        "password" => "wrong-password",
    ]);

    assertGuest();
});
