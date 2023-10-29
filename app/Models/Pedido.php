<?php

namespace App\Models;

use App\Enums\Pedidos\PedidoEstado;
use App\Enums\Pedidos\TipoEntrega;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model {
    use HasFactory;
    use SoftDeletes;

    public $timestamps = false;

    protected $guarded = [];

    public $casts = [
            'fecha_pedido' => 'datetime',
            'fecha_prevista' => 'date',
            'fecha_entrega' => 'date',
            'estado' => PedidoEstado::class,
            'tipo_entrega' => TipoEntrega::class
        ];

    public static function forCurrentUser() {
        return auth()->user()->pedidos()->get()?->load('diseño');
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function diseño(): BelongsTo {
        return $this->belongsTo(Disenio::class, 'disenio_id');
    }
}
