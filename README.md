# Vetiquetas 🔻™

Aplicacion que permite la cotización y pedido de etiquetas personalizadas para indumentaria

## Framework

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="350"></a></p>

### Requerimientos

-   Actualizar la estructura de los usuarios con nuestra lógica
-   Agregar roles para la administración del sistema
-   Crear un CRUD de Precios
-   Crear un CRUD de Diseños
-   Crear un CRUD de Pedidos
-   Gestionar las notificaciones mediante mails

### Pre-requisitos

```
PHP Version: ^8.1
Laravel: ^10.10
```

### Tecnologías/Librerias a usar

-   [Laravel Breeze](https://github.com/laravel/breeze) para la autenticación.
-   [Inertia](https://github.com/inertiajs/inertia) para unificar el frontend con React y Typescript.
-   [Spatie/laravel-permission](https://github.com/spatie/laravel-permission) para la gestión de roles y permisos.

---

## Pasos para levantar el proyecto

#### 1. Clonar el repositorio

```
git clone https://github.com/JoacoCinnamon/vetiquetas-app vetiquetas-app
cd vetiquetas-app
```

#### 2. Instalar las dependencias de PHP

```
composer install
```

#### 3. Copiar el archivo .env.example para crear tu archivo de .env:

```bash
cp .env.example .env
```

Asegurarse siempre de configurar las variables de la base de datos .

#### 4. Instala las Dependencias de Node.js

```
npm install
```

#### 5. Generar una nueva clave de aplicación:

```
php artisan key:generate
```

#### 6. Generar un enlace simbólico para que los archivos sean accesibles desde la web:

```
php artisan storage:link
```

#### 7. Correr las migraciones para crear las tablas de la base de datos y los seeders para llenar la base con el usuario por defecto, y algunos datos demás:

```
php artisan migrate
php artisan db:seed
```

También se puede con `php artisan migrate --seed`

#### Ya terminamos! solo falta correr el proyecto

```
php artisan serve
```

```
npm run dev
```

---
