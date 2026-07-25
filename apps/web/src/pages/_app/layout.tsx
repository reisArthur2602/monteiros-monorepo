import { createFileRoute, Outlet } from '@tanstack/react-router';

const AppLayout = () => {
    return (
        <div>
            AppLayout
            <Outlet />
        </div>
    );
};

export const Route = createFileRoute('/_app')({
    component: AppLayout,
});
