<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class CmsSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'group',
        'payload',
    ];

    protected $casts = [
        'payload' => 'array',
    ];

    /**
     * Get a setting by key with an optional default.
     */
    public static function getPayload(string $key, mixed $default = null): mixed
    {
        return Cache::remember("cms_setting_{$key}", 3600, function () use ($key, $default) {
            $record = static::where('key', $key)->first();
            return $record ? $record->payload : $default;
        });
    }

    /**
     * Set/update a setting by key.
     */
    public static function setPayload(string $key, mixed $payload, string $group = 'general'): static
    {
        $setting = static::updateOrCreate(
            ['key' => $key],
            ['group' => $group, 'payload' => $payload]
        );

        Cache::forget("cms_setting_{$key}");
        Cache::forget("cms_group_{$group}");

        return $setting;
    }

    /**
     * Get all settings in a group as key => payload array.
     */
    public static function getGroupPayloads(string $group): array
    {
        return Cache::remember("cms_group_{$group}", 3600, function () use ($group) {
            return static::where('group', $group)
                ->pluck('payload', 'key')
                ->toArray();
        });
    }
}
