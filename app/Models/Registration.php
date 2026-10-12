<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'public_id',
        'registration_number',
        'submission_token',
        'status',
        'is_possible_duplicate',
        'ip_hash',
        'user_agent_hash',
        'submitted_at',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'is_possible_duplicate' => 'boolean',
    ];

    protected $appends = ['registration_code'];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->public_id)) {
                $model->public_id = (string) Str::ulid();
            }
            if (empty($model->submission_token)) {
                $model->submission_token = (string) Str::uuid();
            }
            if (empty($model->registration_number)) {
                $model->registration_number = static::generateCode();
            }
        });
    }

    protected function registrationCode(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->registration_number,
            set: fn ($value) => ['registration_number' => $value]
        );
    }

    public function profile(): HasOne
    {
        return $this->hasOne(RegistrantProfile::class);
    }

    public function organization(): HasOne
    {
        return $this->hasOne(Organization::class);
    }

    public function offering(): HasOne
    {
        return $this->hasOne(Offering::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(RegistrationAnswer::class);
    }

    public function consents(): HasMany
    {
        return $this->hasMany(RegistrationConsent::class);
    }

    public function statusLogs(): HasMany
    {
        return $this->hasMany(RegistrationStatusLog::class);
    }

    public static function generateCode(): string
    {
        $prefix = "PBG-";
        
        $latest = static::where('registration_number', 'like', "{$prefix}%")
            ->orderByDesc('id')
            ->value('registration_number');

        if ($latest) {
            $numStr = substr($latest, strlen($prefix));
            $num = (int) $numStr;
            $next = str_pad((string) ($num + 1), 5, '0', STR_PAD_LEFT);
        } else {
            $next = '00001';
        }

        return "{$prefix}{$next}";
    }
}
