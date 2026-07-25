import { ScaleIcon } from 'lucide-react';

const features = [
    { value: 'Atendimentos', label: 'Triagem e análise preliminar' },
    { value: 'Prazos', label: 'Controle de tarefas críticas' },
    { value: 'Documentos', label: 'Arquivos, modelos e versões' },
] as const;

export const AuthBanner = () => {
    return (
        <section
            aria-label="Apresentação da plataforma"
            className="relative isolate hidden min-h-dvh flex-col justify-between overflow-hidden bg-(--color-ink-950) p-8 text-white md:flex lg:p-16"
            style={{
                backgroundImage: [
                    'radial-gradient(circle at 12% 15%, rgba(200,147,24,0.22), transparent 26rem)',
                    'radial-gradient(circle at 85% 80%, rgba(45,103,152,0.26), transparent 24rem)',
                    'linear-gradient(145deg, var(--color-ink-950), var(--color-ink-800))',
                ].join(', '),
            }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[16%] -right-36 -z-10 size-100 rounded-full border border-white/10"
                style={{
                    boxShadow: '0 0 0 4rem rgba(255,255,255,0.025), 0 0 0 8rem rgba(255,255,255,0.018)',
                }}
            />

            <a
                aria-label="Monteiro"
                href="#"
                className="inline-flex items-center gap-3 text-white no-underline"
            >
                <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-lg bg-(--color-brass-500) text-(--color-ink-950) shadow-md"
                >
                    <ScaleIcon className="size-4.5" strokeWidth={2} />
                </span>
                <span className="text-xl font-semibold tracking-[-0.02em]">Monteiro</span>
            </a>

            <div className="my-16 max-w-140 lg:my-24">
                <p className="overline mb-4 text-(--color-brass-400)">Gestão jurídica integrada</p>
                <h1 className="max-w-[12ch] font-display text-4xl leading-[1.04] font-medium tracking-[-0.045em] lg:text-6xl">
                    O escritório organizado em um só lugar.
                </h1>
                <p className="mt-6 max-w-148 text-lg text-(--color-ink-100)">
                    Centralize atendimentos, clientes, projetos, processos, prazos e documentos com
                    segurança e rastreabilidade.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4">
                    {features.map((feature) => (
                        <div
                            key={feature.value}
                            className="min-w-0 border-t border-white/15 pt-4"
                        >
                            <span className="block text-sm font-semibold text-white">
                                {feature.value}
                            </span>
                            <span className="mt-1 block text-xs text-(--color-ink-300)">
                                {feature.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="flex items-center justify-between gap-5 text-xs text-(--color-ink-300)">
                <span>© {new Date().getFullYear()} Monteiro</span>
                <span className="inline-flex items-center gap-2">
                    <span
                        aria-hidden="true"
                        className="size-2 rounded-full bg-(--color-sage-500) shadow-[0_0_0_0.25rem_rgba(78,141,107,0.16)]"
                    />
                    Ambiente protegido
                </span>
            </footer>
        </section>
    );
};
