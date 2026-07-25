import { createFileRoute } from '@tanstack/react-router';

const AppRoute = () => {
    return <div>Hello "/_app/"!</div>;
};

export const Route = createFileRoute('/_app/')({
    component: AppRoute,
});
