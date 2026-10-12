<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CmsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RegistrantController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PageController;
use App\Http\Controllers\Public\RegistrationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes — 500 Brand Global
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/daftar', [RegistrationController::class, 'create'])->name('registration.create');
Route::redirect('/pendaftaran', '/daftar');
Route::post('/daftar', [RegistrationController::class, 'store'])->name('registration.store');
Route::get('/pendaftaran-berhasil', [RegistrationController::class, 'success'])->name('registration.success');

Route::get('/tentang', [PageController::class, 'tentang'])->name('page.tentang');
Route::get('/program', [PageController::class, 'program'])->name('page.program');
Route::get('/tahapan', [PageController::class, 'tahapan'])->name('page.tahapan');
Route::get('/academy', [PageController::class, 'academy'])->name('page.academy');
Route::get('/faq', [PageController::class, 'faq'])->name('page.faq');
Route::get('/kontak', [PageController::class, 'kontak'])->name('page.kontak');
Route::get('/privasi', [PageController::class, 'privasi'])->name('page.privasi');
Route::get('/ketentuan', [PageController::class, 'ketentuan'])->name('page.ketentuan');

Route::redirect('/login', '/admin/login')->name('login');

/*
|--------------------------------------------------------------------------
| Admin Portal Routes (/admin)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::middleware('auth')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        
        Route::get('/pendaftar', [RegistrantController::class, 'index'])->name('registrants.index');
        Route::get('/pendaftar/export', [RegistrantController::class, 'exportCsv'])->name('registrants.export');
        Route::get('/pendaftar/export.csv', [RegistrantController::class, 'exportCsv'])->name('registrants.export_csv');
        Route::get('/pendaftar/export.xls', [RegistrantController::class, 'exportExcel'])->name('registrants.export_excel');
        Route::get('/pendaftar/{registration}', [RegistrantController::class, 'show'])->name('registrants.show');
        Route::delete('/pendaftar/{registration}', [RegistrantController::class, 'destroy'])->name('registrants.destroy');
        Route::post('/pendaftar/bulk-delete', [RegistrantController::class, 'bulkDestroy'])->name('registrants.bulk_destroy');
        Route::post('/pendaftar/{registration}/status', [RegistrantController::class, 'updateStatus'])->name('registrants.update_status');

        // CMS Management Routes
        Route::get('/cms/home', [CmsController::class, 'home'])->name('cms.home');
        Route::post('/cms/home', [CmsController::class, 'updateHome'])->name('cms.home.update');
        Route::post('/cms/upload-image', [CmsController::class, 'uploadImage'])->name('cms.upload_image');
        Route::get('/cms/form', [CmsController::class, 'form'])->name('cms.form');
        Route::post('/cms/form', [CmsController::class, 'updateForm'])->name('cms.form.update');
        Route::post('/cms/reset/{type}', [CmsController::class, 'reset'])->name('cms.reset');
    });
});
