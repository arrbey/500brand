<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#061a33">

    {{-- Favicon Website (Dynamic from CMS) --}}
    @php
        $cmsHome = \App\Models\CmsSetting::getPayload('homepage_content', []);
        $faviconUrl = !empty($cmsHome['site_logo']['favicon_url']) ? $cmsHome['site_logo']['favicon_url'] : asset('favicon.ico');
    @endphp
    <link rel="icon" id="site-favicon" href="{{ $faviconUrl }}">
    <link rel="apple-touch-icon" href="{{ $faviconUrl }}">

    {{-- SEO Meta via Inertia Head component --}}
    <meta name="description" content="Portal resmi pendaftaran Program Nasional 500 Brand Go Global. Inisiatif ARRBEY Branding dan Sekolah Ekspor Nasional untuk transformasi brand Indonesia menuju pasar global.">

    {{-- Google Fonts: Poppins --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

    {{-- CSRF Token --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Inertia Head --}}
    @inertiaHead

    {{-- Vite Assets --}}
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body class="antialiased">
    @inertia
</body>
</html>
