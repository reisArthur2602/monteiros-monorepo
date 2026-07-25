import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';

import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                name: 'description',
                content:
                    'Plataforma de gestão completa para o escritório de advocacia Monteiro Sociedade de Advogados',
            },
            {
                name: 'theme-color',
                content: '#233b32',
            },
        ],
        links: [
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com',
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossOrigin: 'anonymous',
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Spline+Sans:wght@400;500;600;700&display=swap',
            },
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <head>
                <HeadContent />
                <style />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}
