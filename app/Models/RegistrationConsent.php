<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistrationConsent extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'consent_key',
        'consented',
        'consent_text',
        'text_version',
        'ip_hash',
        'consented_at',
    ];

    protected $casts = [
        'consented' => 'boolean',
        'consented_at' => 'datetime',
        'text_version' => 'integer',
    ];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
