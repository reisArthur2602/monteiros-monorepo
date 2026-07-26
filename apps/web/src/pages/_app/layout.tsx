import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppSidebar } from './-components/app-sidebar';

const AppLayout = () => {
    return (
        <div className="min-h-dvh bg-canvas">
            <AppSidebar />

            <main className="h-dvh overflow-y-auto p-8 ml-74 max-[53.75rem]:ml-0 max-[53.75rem]:h-auto max-[53.75rem]:overflow-visible max-[72rem]:p-6 max-[40rem]:p-4">
                <div className="mx-auto w-full max-w-384">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export const Route = createFileRoute('/_app')({
    component: AppLayout,
});
