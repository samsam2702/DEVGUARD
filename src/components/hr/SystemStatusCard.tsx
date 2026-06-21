import { ServerCog } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { EmptyState } from "@/components/shared/EmptyState"
import type { SystemStatusItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SystemStatusCardProps {
  items?: SystemStatusItem[]
}

const stateStyles: Record<SystemStatusItem["state"], string> = {
  online: "bg-(--color-good)",
  degraded: "bg-(--color-warn)",
  offline: "bg-(--color-risk)",
}

export function SystemStatusCard({ items }: SystemStatusCardProps) {
  return (
    <DashboardCard title="System Status" icon={ServerCog}>
      {items && items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2.5">
                <span className={cn("h-2 w-2 rounded-full", stateStyles[item.state])} />
                <span className="text-(--color-ink-soft)">{item.label}</span>
              </div>
              <span className="text-xs capitalize text-(--color-ink-faint)">
                {item.detail ?? item.state}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState compact icon={ServerCog} title="No data available" />
      )}
    </DashboardCard>
  )
}
