<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistrationAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'question_key',
        'answer_value',
        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    protected $appends = ['answer_text'];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    protected function answerText(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->answer_value,
            set: fn ($value) => ['answer_value' => $value]
        );
    }
}
