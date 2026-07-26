import { createFileRoute } from '@tanstack/react-router';
import { ModelCard } from './-components/model-card';
import { mockModels } from './-components/mock-models';
import { ModelsPageHeader } from './-components/models-page-header';

const ModelsRoute = () => {
    return (
        <div>
            <ModelsPageHeader />
            <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] gap-4">
                {mockModels.map((model) => (
                    <ModelCard key={model.id} model={model} />
                ))}
            </section>
        </div>
    );
};

export const Route = createFileRoute('/_app/models/')({
    component: ModelsRoute,
});
