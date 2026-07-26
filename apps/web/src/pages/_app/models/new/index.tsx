import { createFileRoute } from '@tanstack/react-router';

const NewModelRoute = () => {
    return <div>Hello "/_app/models/new/"!</div>;
};

export const Route = createFileRoute('/_app/models/new/')({
    component: NewModelRoute,
});
