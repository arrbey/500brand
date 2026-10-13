<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CmsSetting;
use Database\Seeders\CmsSettingSeeder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CmsController extends Controller
{
    /**
     * Show Homepage CMS editor.
     */
    public function home(): Response
    {
        $content = CmsSetting::getPayload('homepage_content', []);

        // Scan available media in public/images safely across all OS platforms
        $existingImages = [];
        $extensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'ico'];

        foreach ($extensions as $ext) {
            $baseFiles = glob(public_path('images/*.' . $ext));
            if ($baseFiles) {
                foreach ($baseFiles as $filePath) {
                    $existingImages[] = '/images/' . basename($filePath);
                }
            }
            $cmsFiles = glob(public_path('images/cms/*.' . $ext));
            if ($cmsFiles) {
                foreach ($cmsFiles as $filePath) {
                    $existingImages[] = '/images/cms/' . basename($filePath);
                }
            }
        }
        $existingImages = array_values(array_unique($existingImages));

        return Inertia::render('Admin/Cms/HomeCms', [
            'content' => $content,
            'existingImages' => $existingImages,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    /**
     * Upload an image for CMS media library.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'file', 'mimes:jpeg,png,jpg,webp,svg,ico', 'max:6144'],
        ]);

        $file = $request->file('image');
        $extension = strtolower($file->getClientOriginalExtension());
        $filename = 'cms_' . date('Ymd_His') . '_' . bin2hex(random_bytes(3)) . '.' . $extension;

        $destinationPath = public_path('images/cms');
        if (!file_exists($destinationPath)) {
            @mkdir($destinationPath, 0775, true);
        }
        @chmod($destinationPath, 0775);

        $file->move($destinationPath, $filename);
        $fullPath = $destinationPath . DIRECTORY_SEPARATOR . $filename;
        @chmod($fullPath, 0644);

        return response()->json([
            'success' => true,
            'url' => '/images/cms/' . $filename,
            'name' => $filename,
        ]);
    }

    /**
     * Update Homepage CMS content.
     */
    public function updateHome(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'hero' => ['required', 'array'],
            'hero.eyebrow' => ['required', 'string'],
            'hero.title_prefix' => ['required', 'string'],
            'hero.title_highlight' => ['required', 'string'],
            'hero.subtitle' => ['required', 'string'],
            'hero.cta_primary_text' => ['required', 'string'],
            'hero.cta_primary_link' => ['required', 'string'],
            'hero.cta_secondary_text' => ['nullable', 'string'],
            'hero.cta_secondary_link' => ['nullable', 'string'],
            'hero.target_count' => ['required', 'string'],
            'hero.target_period' => ['required', 'string'],
            'hero.target_reach' => ['required', 'string'],
            'hero.hero_image' => ['nullable', 'string'],
            'hero.hero_image_tag' => ['nullable', 'string'],
            'hero.hero_caption_title' => ['nullable', 'string'],
            'hero.hero_caption_desc' => ['nullable', 'string'],
            'hero.hero_caption_credit' => ['nullable', 'string'],

            'news_bar' => ['nullable', 'array'],
            'about' => ['nullable', 'array'],
            'pillars' => ['nullable', 'array'],
            'faq' => ['nullable', 'array'],
            'contact' => ['nullable', 'array'],
            'social_media' => ['nullable', 'array'],
            'site_logo' => ['nullable', 'array'],
            'gallery_photos' => ['nullable', 'array'],
        ]);

        CmsSetting::setPayload('homepage_content', $payload, 'home');

        return redirect()->back()->with('success', 'Konten Halaman Home berhasil diperbarui.');
    }

    /**
     * Show Form Questions CMS editor.
     */
    public function form(): Response
    {
        $content = CmsSetting::getPayload('form_content', []);

        return Inertia::render('Admin/Cms/FormCms', [
            'content' => $content,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    /**
     * Update Form Questions CMS configuration.
     */
    public function updateForm(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'header' => ['required', 'array'],
            'step_labels' => ['required', 'array'],
            'interest_categories' => ['required', 'array'],
            'interest_categories.*' => ['required', 'string'],
            'goal_options' => ['required', 'array'],
            'goal_options.*.id' => ['required', 'string'],
            'goal_options.*.text' => ['required', 'string'],
            'operating_status_options' => ['nullable', 'array'],
            'offering_type_options' => ['nullable', 'array'],
            'current_market_options' => ['nullable', 'array'],
            'brand_status_options' => ['nullable', 'array'],
            'consent_texts' => ['nullable', 'array'],
        ]);

        CmsSetting::setPayload('form_content', $payload, 'form');

        return redirect()->back()->with('success', 'Pertanyaan & Konfigurasi Formulir berhasil diperbarui.');
    }

    /**
     * Reset CMS settings to default factory values.
     */
    public function reset(Request $request, string $type): RedirectResponse
    {
        $seeder = new CmsSettingSeeder();

        if ($type === 'home') {
            CmsSetting::where('key', 'homepage_content')->delete();
            $seeder->run();
            return redirect()->route('admin.cms.home')->with('success', 'Konten Halaman Home telah di-reset ke pengaturan standar.');
        }

        if ($type === 'form') {
            CmsSetting::where('key', 'form_content')->delete();
            $seeder->run();
            return redirect()->route('admin.cms.form')->with('success', 'Pertanyaan & Konfigurasi Formulir telah di-reset ke pengaturan standar.');
        }

        return redirect()->back()->with('error', 'Tipe CMS tidak valid.');
    }
}
