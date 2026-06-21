import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-(--color-surface-muted) text-(--color-ink-soft)",
        accent: "bg-(--color-accent-soft) text-(--color-accent)",
        good: "bg-(--color-good-soft) text-(--color-good)",
        warn: "bg-(--color-warn-soft) text-(--color-warn)",
        risk: "bg-(--color-risk-soft) text-(--color-risk)",
        outline: "border border-(--color-border-strong) text-(--color-ink-soft)",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
