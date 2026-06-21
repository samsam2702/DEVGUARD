import { Search } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { EmptyState } from "@/components/shared/EmptyState"
import type { RootCauseItem } from "@/lib/types"

interface RootCauseCardProps {
  items?: RootCauseItem[]
}

export function RootCauseCard({ items }: RootCauseCardProps) {
  return (
    <DashboardCard
      title="Root Cause Analysis"
      description="Likely contributing factors, ranked by weight"
      icon={Search}
    >
      {items && items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-lg border border-(--color-border) p-3"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent)" />
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-(--color-ink)">{item.label}</p>
                {item.description && (
                  <p className="text-xs text-(--color-ink-faint)">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState compact icon={Search} title="No data available" />
      )}
    </DashboardCard>
  )
}
