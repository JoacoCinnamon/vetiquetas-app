<?php

use App\Models\User;

use function Pest\Laravel\{actingAs, assertAuthenticated};
use function PHPUnit\Framework\{assertNotNull, assertNull, assertSame};

test('profile page is displayed', function () {
    $user = User::factory()->create();

    $response = actingAs($user)
        ->get('/perfil');

    $response->assertOk();
});

test('profile information can be updated', function () {
    $user = User::factory()->create();

    $response = actingAs($user)
        ->patch('/perfil', [
            'nombre' => 'Test Name',
            'apellido' => 'Test Lastname',
            'email' => 'test@example.com',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/perfil');

    $user->refresh();

    assertSame('Test Name', $user->nombre);
    assertSame('Test Lastname', $user->apellido);
    assertSame('test@example.com', $user->email);
    assertNull($user->email_verified_at);
});

test('email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->create();

    $response = actingAs($user)
        ->patch('/perfil', [
            'nombre' => 'Test name',
            'email' => $user->email,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/perfil');

    assertNotNull($user->refresh()->email_verified_at);
});

test('user cant delete their account', function () {
    $user = User::factory()->create();

    $response = actingAs($user)
        ->delete('/perfil', [
            'password' => 'password',
        ]);

    $response->assertMethodNotAllowed();

    assertAuthenticated();
});
