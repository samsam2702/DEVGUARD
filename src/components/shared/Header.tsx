import type { ReactNode } from "react"
import { Logo } from "./Logo"
import { cn } from "@/lib/utils"

interface HeaderProps {
  subtitle?: string
  actions?: ReactNode
  className?: string
}

export function Header({ subtitle, actions, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-(--color-border) bg-white/90 px-5 backdrop-blur-sm sm:px-8",
        className
      )}
    >
      <div className="flex items-baseline gap-3">
        <Logo />
        {subtitle && (
          <>
            <span className="hidden h-4 w-px bg-(--color-border-strong) sm:block" />
            <span className="hidden text-sm text-(--color-ink-faint) sm:block">
              {subtitle}
            </span>
          </>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  )
}
