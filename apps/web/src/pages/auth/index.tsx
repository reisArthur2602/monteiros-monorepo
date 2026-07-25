import { createFileRoute } from '@tanstack/react-router';

const AuthRoute = () => {
    return <div>AuthRoute</div>;
};

export const Route = createFileRoute('/auth/')({
    component: AuthRoute,
});
