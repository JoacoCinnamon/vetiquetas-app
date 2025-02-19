<?php

namespace App\Services\Pedidos;

use App\Models\Pedido;
use App\Services\PedidoService;
use Barryvdh\Snappy\Facades\SnappyPdf as PDF;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PedidoCreatePDF {
    public static function create(Pedido $pedido) {
        $pedido = PedidoService::getDataForPdf($pedido);

        try {
            $pdf = PDF::loadView('pdfs.pedidos.create', compact('pedido'))
                ->setOption('margin-bottom', '0')
                ->setOption('margin-left', '0')
                ->setOption('margin-right', '0')
                ->setOption('margin-top', '0')
                ->setOption('disable-smart-shrinking', true)
                ->setOption('viewport-size', '210mm')
                ->setOption('toc', false)
                ->setOption('enable-local-file-access', true)
                ->setOption('print-media-type', true);

            return $pdf;
        } catch (\Throwable $th) {
            Log::error('There has been an error while creating the pdf: ' . $th->getMessage());
            throw $th;
        }
    }

    public static function store(\Barryvdh\Snappy\PdfWrapper $pdf, string $path, $disk = 'public') {
        try {
            Storage::disk($disk)->put($path, $pdf->output());

            return $path;
        } catch (\Throwable $th) {
            Log::error('There has been an error while storing the pdf: ' . $th->getMessage());
            throw $th;
        }
    }

    public static function createAndStore(Pedido $pedido, string $path = null, $disk = 'public') {
        $pdf = self::create($pedido);
        $path = empty($path) ? "pedidos/pdfs/{$pedido->uuid}.pdf" : $path;
        return self::store($pdf, $path, $disk);
    }
}
