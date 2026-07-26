import { SidebarBrand } from './sidebar-brand';
import { SidebarNav } from './sidebar-nav';
import { SidebarUser } from './sidebar-user';

export const AppSidebar = () => {
    return (
        <aside
            aria-label="Navegação principal"
            className="fixed inset-y-0 left-0 z-50 flex h-screen w-74 flex-col justify-between overflow-y-auto bg-(--color-ink-950) p-5 text-white"
        >
            <div className="grid gap-8">
                <SidebarBrand />
                <SidebarNav />
            </div>

            <div className="mt-8">
                <SidebarUser
                    user={{
                        name: 'Marina Costa',
                        email: 'marina.costa@monteiro.adv.br',
                    }}
                />
            </div>
        </aside>
    );
};
