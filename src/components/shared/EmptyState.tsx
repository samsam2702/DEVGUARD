import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  className?: string
  compact?: boolean
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "gap-2 py-8" : "gap-3 py-14",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-(--color-surface-muted)",
          compact ? "h-10 w-10" : "h-12 w-12"
        )}
      >
        <Icon
          className={cn("text-(--color-ink-faint)", compact ? "h-5 w-5" : "h-6 w-6")}
          strokeWidth={1.75}
        />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-(--color-ink-soft)">{title}</p>
        {description && (
          <p className="max-w-xs text-xs text-(--color-ink-faint)">{description}</p>
        )}
      </div>
    </div>
  )
}
