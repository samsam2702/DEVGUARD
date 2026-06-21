import type { LucideIcon } from "lucide-react"
import { LayoutGrid, Users2, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItem {
  id: string
  label: string
  icon: LucideIcon
}

const items: SidebarItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "employees", label: "Employees", icon: Users2 },
  { id: "settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  active?: string
  onSelect?: (id: string) => void
}

export function Sidebar({ active = "overview", onSelect }: SidebarProps) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-(--color-border) bg-white px-3 py-6 lg:block">
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect?.(item.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-(--color-accent-soft) text-(--color-accent)"
                  : "text-(--color-ink-soft) hover:bg-(--color-surface-muted)"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
