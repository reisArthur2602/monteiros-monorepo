import { createFileRoute } from '@tanstack/react-router';

const AppLayout = () => {
    return <div>AppLayout</div>;
};

export const Route = createFileRoute('/_app')({
    component: AppLayout,
});
