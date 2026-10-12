<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistrantProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'full_name',
        'email',
        'whatsapp',
        'whatsapp_e164',
        'province_code',
        'province_name',
        'city_code',
        'city_name',
        'category_code',
        'category_label',
        'role_title',
    ];

    protected $appends = ['province', 'city', 'phone', 'position'];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    protected function province(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->province_name,
            set: fn ($value) => ['province_name' => $value]
        );
    }

    protected function city(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->city_name,
            set: fn ($value) => ['city_name' => $value]
        );
    }

    protected function phone(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->whatsapp,
            set: fn ($value) => ['whatsapp' => $value]
        );
    }

    protected function position(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->role_title,
            set: fn ($value) => ['role_title' => $value]
        );
    }
}
