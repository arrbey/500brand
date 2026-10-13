import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { router } from '@inertiajs/react';

const appName = (window as Window & typeof globalThis & { appName?: string }).appName ?? '500 Brand Global';

const updateDocumentFavicon = (faviconUrl?: string) => {
    if (!faviconUrl) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    if (link.href !== faviconUrl) {
        link.href = faviconUrl;
    }
};

const updateCsrfToken = (token?: string) => {
    if (!token) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'csrf-token';
        document.head.appendChild(meta);
    }
    meta.content = token;
};

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const initialFavicon = (props.initialPage.props as any)?.globalFavicon || (props.initialPage.props as any)?.globalLogo?.favicon_url;
        updateDocumentFavicon(initialFavicon);
        const initialCsrf = (props.initialPage.props as any)?.csrf_token;
        updateCsrfToken(initialCsrf);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#f3b641', // gold
    },
});

router.on('navigate', (event) => {
    const favicon = (event.detail.page.props as any)?.globalFavicon || (event.detail.page.props as any)?.globalLogo?.favicon_url;
    updateDocumentFavicon(favicon);
    const csrf = (event.detail.page.props as any)?.csrf_token;
    updateCsrfToken(csrf);
});
