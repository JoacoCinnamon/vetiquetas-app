<?php

namespace App\Models;

use App\Enums\Pedidos\PedidoEstado;
use App\Enums\Pedidos\TipoEntrega;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

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

    public static function analytics(): array {
        // Ingresos totales
        $totalIncome = DB::table('pedidos')->sum('precio');
        $lastMonthIncome = DB::table('pedidos')
            ->whereBetween('fecha_pedido', [now()->subMonth(), now()])
            ->sum('precio');

        // Pedidos
        $totalOrders = DB::table('pedidos')->count();
        $lastMonthOrders = DB::table('pedidos')
            ->whereBetween('fecha_pedido', [now()->subMonth(), now()])
            ->count();

        // Diseños
        $totalDesigns = DB::table('diseños')->count();
        $lastMonthDesigns = DB::table('diseños')
            ->whereBetween('creado_el', [now()->subMonth(), now()])
            ->count();

        // Usuarios
        $totalUsers = DB::table('users')->count();
        $usersSinceLastHour = DB::table('users')
            ->where('created_at', '>=', now()->subHour())
            ->count();

        return [
            'totalIncome' => number_format($totalIncome, 2),
            'incomeChange' => calculatePercentageChange($lastMonthIncome, $totalIncome),
            'totalOrders' => $totalOrders,
            'lastMonthOrders' => $lastMonthOrders,
            'ordersChange' => calculatePercentageChange($lastMonthOrders, $totalOrders),
            'totalDesigns' => $totalDesigns,
            'designsChange' => calculatePercentageChange($lastMonthDesigns, $totalDesigns),
            'totalUsers' => $totalUsers,
            'usersChange' => calculatePercentageChange($totalUsers - $usersSinceLastHour, $totalUsers),
            'dailyOrders' => self::dailyOrders(),
            'lastFiveSales' => self::lastFiveSales(),
        ];
    }

    public static function dailyOrders(): array {
        $dailyOrdersData = DB::table('pedidos')
            ->select(DB::raw('DATE(fecha_pedido) as day'), DB::raw('SUM(precio) as precio'))
            ->groupBy('day')
            ->get();

        // Formatear los datos en el formato esperado por el gráfico
        $formattedData = $dailyOrdersData->map(function ($item) {
            return [
                'time' => $item->day,
                'value' => str($item->precio)->toFloat(),
            ];
        })->toArray();

        return $formattedData;
    }

    public static function lastFiveSales(): array {
        $recentSalesData = DB::table('pedidos')
        ->join('users', 'pedidos.user_id', '=', 'users.id')
        ->select('users.nombre as nombre', 'users.apellido as apellido', 'users.email as email', 'pedidos.precio as precio')
        ->orderByDesc('pedidos.fecha_pedido')
        ->take(5)
        ->get();

        return $recentSalesData->toArray();
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function diseño(): BelongsTo {
        return $this->belongsTo(Disenio::class, 'disenio_id');
    }
}

function calculatePercentageChange($previousValue, $currentValue) {
    if ($previousValue == 0) {
        return '+100%';
    }

    $percentageChange = (($currentValue - $previousValue) / $previousValue) * 100;

    return ($percentageChange > 0 ? '+' : '') . number_format($percentageChange, 1) . '%';
}
