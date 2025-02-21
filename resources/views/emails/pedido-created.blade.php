<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Pedido</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            line-height: 1.6;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 20px;
        }

        .footer {
            font-size: 0.9em;
            color: #666;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Pedido N° {{ $pedidoData['id'] }}</h1>
    </div>

    <div class="content">
        <p>Se ha registrado exitósamente el pedido de <strong>{{ $pedidoData['user']['nombre'] }}
                {{ $pedidoData['user']['apellido'] }}</strong>.</p>
        <p>A continuación, los detalles:</p>
        <ul>
            <li><strong>Fecha:</strong> {{ $pedidoData['fecha_pedido'] }}</li>
            <li><strong>Fecha prevista:</strong> {{ $pedidoData['fecha_prevista'] }}</li>
            <li><strong>Tipo de Entrega:</strong> {{ $pedidoData['tipo_entrega'] }}</li>
            <li><strong>Cantidad:</strong> {{ $pedidoData['cantidad'] }}</li>
            <li><strong>Total:</strong> {{ $pedidoData['precio'] }}</li>
        </ul>
        <p>Adjunto el PDF con los detalles completos del pedido.</p>
    </div>

    <div class="footer">
        <p>Atentamente,<br>El equipo de soporte</p>
    </div>
</body>

</html>
