import { QueryClient } from '@tanstack/react-query';

export function getContext() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutos
                gcTime: 10 * 60 * 1000, // 10 minutos
                retry: (failureCount, error) => {
                    // Não retenta erros 4xx (exceto 408, 429)
                    if (error instanceof Error && 'status' in error) {
                        const status = (error as any).status;
                        if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
                            return false;
                        }
                    }
                    // Retenta até 3 vezes para outros erros
                    return failureCount < 3;
                },
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
                refetchOnWindowFocus: true,
                refetchOnMount: true,
                refetchOnReconnect: true,
                networkMode: 'always',
            },
            mutations: {
                retry: (failureCount) => failureCount < 3,
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
                networkMode: 'always',
            },
        },
    });

    return {
        queryClient,
    };
}

export default function TanstackQueryProvider() {}
