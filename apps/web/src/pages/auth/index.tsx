import { createFileRoute } from '@tanstack/react-router';
import { AuthBanner } from './-components/auth-banner';
import { AuthForm } from './-components/auth-form';

const AuthRoute = () => {
    return (
        <main className="grid min-h-dvh md:grid-cols-[minmax(22rem,0.92fr)_minmax(30rem,1.08fr)]">
            <AuthBanner />
            <AuthForm />
        </main>
    );
};

export const Route = createFileRoute('/auth/')({
    component: AuthRoute,
});
