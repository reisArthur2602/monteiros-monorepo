import { Link } from '@tanstack/react-router';
import { ScaleIcon } from 'lucide-react';

export const SidebarBrand = () => {
    return (
        <Link to="/" aria-label="Monteiro" className="inline-flex items-center gap-3.5 text-white no-underline">
            <span
                aria-hidden="true"
                className="grid size-(--control-md) shrink-0 place-items-center rounded-md border border-white/16 bg-(--color-seal-500) text-white"
            >
                <ScaleIcon className="size-[1.1rem]" strokeWidth={1.9} />
            </span>
            <span className="grid min-w-0">
                <strong className="font-display text-[1.3rem] font-medium tracking-[-0.03em] text-white">
                    Monteiro
                </strong>
                <span className="text-[0.8rem] text-(--color-ink-300)">Painel jurídico</span>
            </span>
        </Link>
    );
};
