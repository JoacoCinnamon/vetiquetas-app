<!doctype html>
<html lang="es">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Vetiquetas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 8px;
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

        img {
            max-width: 100%;
            /* Ensure the image fits within the page width */
            max-height: 200px;
            /* Limit the height to prevent overflow */
            height: auto;
            /* Maintain aspect ratio */
            display: block;
            /* Remove extra space below the image */
            margin-top: 20px;
            /* Add space above the image */
            page-break-inside: avoid;
            /* Prevent the image from breaking across pages */
        }

        .colored-table {
            margin-top: 20px;
            /* Add space above the second table */
        }

        /* Ensure no content spills over to the next page */
        @media print {
            body {
                page-break-inside: avoid;
            }

            img {
                max-height: 400px;
            }
        }
    </style>
</head>

<body>
    <header>
        <h2>Pedido N°{{ $pedido['id'] }}</h2>
    </header>
    <!-- First Table -->
    <table>
        <tr>
            <th>CLIENTE:</th>
            <td>{{ $pedido['user']['nombre'] }} {{ $pedido['user']['apellido'] }}</td>
        </tr>
        <tr>
            <th>CUIT:</th>
            <td>{{ $pedido['user']['cuit_cuil'] }}</td>
        </tr>
        <tr>
            <th>FECHA:</th>
            <td>{{ $pedido['fecha_pedido'] }}</td>
        </tr>
        <tr>
            <th>TIPO DE ETIQUETA:</th>
            <td>{{ $pedido['diseño']['tipo_etiqueta']['nombre'] }}</td>
        </tr>
        <tr>
            <th>UNIDADES:</th>
            <td>{{ $pedido['cantidad'] }}</td>
        </tr>
        <tr>
            <th>TIPO ENTREGA:</th>
            <td>{{ $pedido['tipo_entrega'] }}</td>
        </tr>
        <tr>
            <th>ANCHO:</th>
            <td>{{ $pedido['diseño']['ancho'] }}</td>
        </tr>
        <tr>
            <th>LARGO:</th>
            <td>{{ $pedido['diseño']['largo'] }}</td>
        </tr>
        <tr>
            <th>NOMBRE DE ETIQUETA:</th>
            <td>{{ $pedido['diseño']['nombre'] }}</td>
        </tr>
        <tr>
            <th>DESCRIPCION:</th>
            <td>{{ $pedido['descripcion'] }}</td>
        </tr>
    </table>

    <!-- Second Table for Colors -->
    <table class="colored-table">
        <thead>
            <tr>
                <th></th>
                <th>COLORES</th>
                <th>CODIGO</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>FONDO</td>
                <td>{{ $pedido['diseño']['color_fondo']['nombre'] }}</td>
                <td>{{ $pedido['diseño']['color_fondo']['codigo'] }}</td>
            </tr>
            @foreach ($pedido['diseño']['colores'] as $index => $color)
                <tr>
                    <td>COL {{ $index + 1 }}</td>
                    <td>{{ $color['nombre'] }}</td>
                    <td>{{ $color['codigo'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Image -->
    {{-- TODO: En local rompe al querer insertar la imagen que se tiene en local.. --}}
    @if (!app()->isLocal())
        <img src="{{ $pedido['foto'] }}}}">
    @endif
</body>

</html>
