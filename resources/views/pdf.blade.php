<!doctype html>
<html lang="es">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Etiqueta</title>

    <style>
        body {
            font-family: Arial, sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #f8f8f8;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            margin: 0;
        }
    </style>

</head>

<body>
    <table>
        <tr>
            <th>CLIENTE:</th>
            <td>{{ $pedido->user->nombre }} {{ $pedido->user->apellido }}</td>
        </tr>
        <tr>
            <th>CUIT:</th>
            <td>{{ $pedido->user->cuit_cuil }}</td>
        </tr>
        <tr>
            <th>NOMBRE DE ETIQUETA:</th>
            <td>{{ $pedido->diseño->nombre }}</td>
        </tr>
        <tr>
            <th>DESCRIPCION:</th>
            <td>{{ $pedido->descripcion }}</td>
        </tr>
        <tr>
            <th>FECHA:</th>
            <td>{{ $pedido->fecha_pedido->format('Y-d-m') }}</td>
        </tr>
        <tr>
            <th>ORDEN:</th>
            <td>{{ $pedido->id }}</td>
        </tr>
        <tr>
            <th>TIPO DE ETIQUETA:</th>
            <td>{{ $pedido->diseño->tipoEtiqueta->nombre }}</td>
        </tr>
        <tr>
            <th>UNIDADES:</th>
            <td>{{ $pedido->cantidad }}</td>
        </tr>
        <tr>
            <th>TIPO ENTREGA:</th>
            <td>{{ $pedido->tipo_entrega->label() }}</td>
        </tr>
        <tr>
            <th>ANCHO:</th>
            <td>{{ $pedido->diseño->ancho }}</td>
        </tr>
        <tr>
            <th>LARGO:</th>
            <td>{{ $pedido->diseño->largo }}</td>
        </tr>
    </table>

    <table style="padding-top: 12px">
        <thead>
            <th>
            </th>
            <th>
                COLORES
            </th>
            <th>
                CODIGO
            </th>
        </thead>

        <tbody>
            <tr>
                <td>FONDO</td>
                <td>{{ $pedido->diseño->colorFondo->nombre }}</td>
                <td>{{ $pedido->diseño->colorFondo->codigo }}</td>
            </tr>
            @foreach ($pedido->diseño->colores as $index => $color)
                <tr>
                    <td>COL {{ $index + 1 }}</td>
                    <td>{{ $color->nombre }}</td>
                    <td>{{ $color->codigo }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <img src="{{ public_path($pedido->diseño->foto_path) }}">
    {{-- Esto de abajo en producción funciona, pero en local se cuelga todo --}}
    {{-- {{ asset($pedido->diseño->foto_path) }} --}}
</body>

</html>
