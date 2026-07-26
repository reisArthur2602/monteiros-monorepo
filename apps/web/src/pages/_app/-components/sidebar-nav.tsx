import { cn } from '@/lib/utils';
import { Link, useRouterState } from '@tanstack/react-router';
import { CalendarDaysIcon, FilesIcon, HouseIcon, UsersIcon } from 'lucide-react';

/*
 * Clientes e Agenda ainda não têm rota implementada — usam <a> comum
 * (sem client-side navigation) até essas páginas existirem, para não
 * inventar rotas silenciosamente.
 */
const navItems = [
    { title: 'Início', href: '/', icon: HouseIcon, hasRoute: true },
    { title: 'Clientes', href: '/clients', icon: UsersIcon, hasRoute: false },
    { title: 'Agenda', href: '/agenda', icon: CalendarDaysIcon, hasRoute: false },
    { title: 'Modelos', href: '/models', icon: FilesIcon, hasRoute: true },
] as const;

const itemClassName =
    'nav-item relative inline-flex min-h-11 items-center gap-3 rounded-md py-[0.7rem] pr-[0.9rem] pl-4 text-(--color-ink-200) no-underline transition-colors duration-fast ease-standard hover:bg-white/5 hover:text-white [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.9]';

const activeMarkerClassName =
    "before:absolute before:-left-1 before:top-[0.6rem] before:bottom-[0.6rem] before:w-[3px] before:rounded-full before:bg-(--color-seal-500) before:content-['']";

export const SidebarNav = () => {
    const pathname = useRouterState({ select: (state) => state.location.pathname });

    return (
        <nav className="grid gap-[0.45rem]">
            {navItems.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                const className = cn(itemClassName, isActive && ['bg-white/6 text-white', activeMarkerClassName]);

                if (!item.hasRoute) {
                    return (
                        <a key={item.href} href={item.href} className={className}>
                            <item.icon />
                            <span>{item.title}</span>
                        </a>
                    );
                }

                return (
                    <Link key={item.href} to={item.href} className={className}>
                        <item.icon />
                        <span>{item.title}</span>
                    </Link>
                );
            })}
        </nav>
    );
};
