<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Color extends Model {
    use HasFactory;

    public $timestamps = false;
    protected $table = 'colores';
    protected $guarded = [];

    public function hex(): Attribute {
        return Attribute::make(
            // Lo transforma de la base de datos
            get: fn ($value) => "#$value",
            // Lo transforma a la base de datos
            set: fn ($value) => str_replace('#', '', $value),
        );
    }

    public function diseños(): BelongsToMany {
        return $this->belongsToMany(Disenio::class, 'color_diseño', 'color_id', 'diseño_id');
    }
}
