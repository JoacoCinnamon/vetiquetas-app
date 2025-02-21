<?php

namespace App\Mail;

use App\Models\Pedido;
use App\Services\Pedidos\PedidoCreatePDF;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PedidoCreatedMail extends Mailable {
    use Queueable;
    use SerializesModels;

    public array $pedidoData;

    /**
     * Create a new message instance.
     */
    public function __construct(public Pedido $pedido) {
        $this->pedidoData = [
            'id' => $pedido->id,
            'descripcion' => $pedido->descripcion,
            'fecha_pedido' => $pedido->fecha_pedido->format('d/m/Y'),
            'fecha_prevista' => $pedido->fecha_prevista->format('d/m/Y'),
            'cantidad' => $pedido->cantidad,
            'tipo_entrega' => $pedido->tipo_entrega->label(),
            'precio' => '$' . number_format($pedido->precio, 2, ',', '.'),

            'user' => [
                'nombre' => $pedido->user->nombre,
                'apellido' => $pedido->user->apellido,
            ],

        ];
        Log::info('PedidoCreatedMail: ' . json_encode($this->pedidoData));
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build() {
        // Attach the PDF to the email
        try {
            $path = PedidoCreatePDF::createAndStore($this->pedido);
            $this->attachFromStorageDisk('public', $path);
        } catch (\Throwable $th) {
            Log::warning('There was an error while creating the PDF for the email: ' . $th->getMessage());
        }

        // Pass pedidoData to the view
        return $this->subject("✅ Vetiquetas - Confirmación de Pedido - {$this->pedido->user->nombre} {$this->pedido->user->apellido}")
                    ->view('emails.pedido-created')
                    ->with('pedidoData', $this->pedidoData); // Pass pedidoData to the view
    }
}
