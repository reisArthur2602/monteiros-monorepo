import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';

type SidebarUserProps = {
    user: {
        name: string;
        email: string;
        avatarUrl?: string;
    };
};

const getInitials = (name: string) =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');

export const SidebarUser = ({ user }: SidebarUserProps) => {
    const initials = getInitials(user.name);

    return (
        <details className="group/profile relative">
            <summary
                className="grid w-full cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-transparent bg-white/3 p-[0.85rem] transition-colors duration-fast ease-standard group-open/profile:border-white/8 group-open/profile:bg-white/6 [&::-webkit-details-marker]:hidden [&::marker]:hidden"
            >
                <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white/12 text-[0.7rem] font-semibold text-white"
                >
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="" className="size-full object-cover" />
                    ) : (
                        initials
                    )}
                </span>
                <span className="grid min-w-0">
                    <strong className="truncate text-[0.92rem] font-semibold text-white">
                        {user.name}
                    </strong>
                    <span className="truncate text-[0.78rem] text-(--color-ink-300)">
                        {user.email}
                    </span>
                </span>
                <ChevronsUpDownIcon aria-hidden="true" className="size-4 text-(--color-ink-300)" />
            </summary>

            <div className="absolute right-0 bottom-[calc(100%+0.75rem)] left-0 z-20">
                <div className="rounded-lg border border-white/8 bg-(--color-ink-900) p-[0.9rem] shadow-lg">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-white/8 pb-[0.9rem]">
                        <span
                            aria-hidden="true"
                            className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white/12 text-sm font-semibold text-white"
                        >
                            {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt="" className="size-full object-cover" />
                            ) : (
                                initials
                            )}
                        </span>
                        <div className="min-w-0">
                            <strong className="block truncate text-[0.92rem] font-semibold text-white">
                                {user.name}
                            </strong>
                            <p className="mt-[0.15rem] truncate text-[0.78rem] text-(--color-ink-300)">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mt-[0.9rem] inline-flex min-h-[2.625rem] w-full items-center justify-center gap-[0.65rem] rounded-md bg-white/5 px-4 text-white transition-colors duration-fast ease-standard hover:bg-white/10"
                    >
                        <LogOutIcon className="size-4" />
                        <span>Sair da conta</span>
                    </button>
                </div>
            </div>
        </details>
    );
};
