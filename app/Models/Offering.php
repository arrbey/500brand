<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offering extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'type',
        'name',
        'category',
        'description',
        'brand_status',
        'brand_name',
        'current_market',
        'market_plan',
    ];

    protected $appends = ['offering_type', 'usp'];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    protected function offeringType(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->type,
            set: fn ($value) => ['type' => $value]
        );
    }

    protected function usp(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->name,
            set: fn ($value) => ['name' => $value]
        );
    }
}
