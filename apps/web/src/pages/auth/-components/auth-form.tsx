import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon, InfoIcon, ScaleIcon } from 'lucide-react';
import { useState } from 'react';

export const AuthForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section
            aria-label="Formulário de acesso"
            className="grid min-h-dvh place-items-center bg-canvas p-5 md:p-8"
        >
            <article className="w-full max-w-114 rounded-xl border border-subtle bg-surface-elevated p-6 shadow-lg md:p-10">
                <a
                    aria-label="Monteiro"
                    href="#"
                    className="mb-8 inline-flex items-center gap-3 no-underline md:hidden"
                >
                    <span
                        aria-hidden="true"
                        className="grid size-11 place-items-center rounded-lg bg-(--color-brass-500) text-(--color-ink-950) shadow-md"
                    >
                        <ScaleIcon className="size-4.5" strokeWidth={2} />
                    </span>
                    <span className="font-display text-lg font-medium text-primary-text">
                        Monteiro
                    </span>
                </a>

                <header className="mb-8">
                    <h2 className="mt-1 font-display text-3xl leading-tight font-medium tracking-[-0.03em]">
                        Entre na sua conta
                    </h2>
                    <p className="mt-3 text-secondary-text">
                        Use as credenciais fornecidas pelo administrador do escritório.
                    </p>
                </header>

                <form className="grid gap-5" noValidate>
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email">
                            E-mail <span className="text-danger-text">*</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="username"
                            placeholder="nome@escritorio.com.br"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="password">
                            Senha <span className="text-danger-text">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                placeholder="Digite sua senha"
                                required
                                minLength={6}
                                className="pr-11"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                aria-pressed={showPassword}
                                onClick={() => setShowPassword((value) => !value)}
                                className="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-md text-tertiary-text transition-colors hover:bg-surface-subtle hover:text-primary-text"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="size-4" />
                                ) : (
                                    <EyeIcon className="size-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" size="lg" className="mt-1 w-full">
                        Entrar
                    </Button>
                </form>

                <aside className="mt-6 grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-status-info-border bg-status-info-bg p-4 text-status-info-text">
                    <span
                        aria-hidden="true"
                        className="grid size-6 place-items-center rounded-full bg-status-info-text/12"
                    >
                        <InfoIcon className="size-3.5" />
                    </span>
                    <div>
                        <p className="text-sm font-semibold">
                            Contas são criadas pelo administrador
                        </p>
                        <p className="mt-1 text-xs leading-normal">
                            Para solicitar acesso ou alterar sua senha, entre em contato com o
                            administrador do escritório.
                        </p>
                    </div>
                </aside>
            </article>
        </section>
    );
};
