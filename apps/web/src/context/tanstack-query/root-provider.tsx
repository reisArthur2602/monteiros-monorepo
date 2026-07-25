import { QueryClient } from '@tanstack/react-query';

export function getContext() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutos
                gcTime: 10 * 60 * 1000, // 10 minutos
            },
        },
    });

    return {
        queryClient,
    };
}

export default function TanstackQueryProvider() {}
