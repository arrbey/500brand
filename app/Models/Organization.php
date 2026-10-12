<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'operating_status',
        'name',
        'entity_type',
        'sector',
        'founded_year',
        'scale',
        'website_social',
        'description',
    ];

    protected $appends = ['legal_entity_name', 'brand_name', 'annual_revenue', 'website'];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    protected function legalEntityName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->name,
            set: fn ($value) => ['name' => $value]
        );
    }

    protected function brandName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->registration->offering?->brand_name ?? $this->name,
        );
    }

    protected function annualRevenue(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->scale,
            set: fn ($value) => ['scale' => $value]
        );
    }

    protected function website(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->website_social,
            set: fn ($value) => ['website_social' => $value]
        );
    }
}
