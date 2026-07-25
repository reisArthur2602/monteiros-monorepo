import { Button } from '#/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';

const AuthRoute = () => {
    return <div>AuthRoute
        <Button>Hello Word</Button>
    </div>;
};

export const Route = createFileRoute('/auth/')({
    component: AuthRoute,
});
