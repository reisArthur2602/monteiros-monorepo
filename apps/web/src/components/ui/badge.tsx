import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Badge segue a especificação de components.badge do Design System
 * (design-system.json): altura 22px, raio 6px, texto 11px/600, ponto
 * semântico de 5px antes do texto usando currentColor. A cor nunca é o
 * único indicador — o texto sempre descreve o estado.
 *
 * Divergência registrada: design-system.css (bloco de overrides "Registro
 * 2.0") define radius-sm (4px) e um ponto de 6px para .ds-badge, mas
 * design-system.json — fonte primária — especifica 6px de raio e 5px de
 * ponto. Priorizado o valor do JSON conforme regra de precedência.
 */
const badgeVariants = cva(
  "group/badge inline-flex h-(--badge-height) w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md border px-2 text-2xs font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3! before:size-[5px] before:shrink-0 before:rounded-full before:bg-current",
  {
    variants: {
      variant: {
        neutral: "border-status-neutral-border bg-status-neutral-bg text-status-neutral-text",
        info: "border-status-info-border bg-status-info-bg text-status-info-text",
        success: "border-status-success-border bg-status-success-bg text-status-success-text",
        warning: "border-status-warning-border bg-status-warning-bg text-status-warning-text",
        danger: "border-status-danger-border bg-status-danger-bg text-status-danger-text",
        special: "border-status-special-border bg-status-special-bg text-status-special-text",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

function Badge({
  className,
  variant = "neutral",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
