import { Activity } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { riskLevelBarColor } from "@/lib/risk"
import type { SignalBreakdownItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SignalBreakdownProps {
  signals?: SignalBreakdownItem[]
}

export function SignalBreakdown({ signals }: SignalBreakdownProps) {
  return (
    <DashboardCard
      title="Signal Breakdown"
      description="Chat, voice and facial signal contribution"
      icon={Activity}
    >
      {signals && signals.length > 0 ? (
        <div className="space-y-4">
          {signals.map((signal) => (
            <div key={signal.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-(--color-ink-soft)">{signal.label}</span>
                <span className="font-medium text-(--color-ink)">{signal.value}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--color-surface-muted)">
                <div
                  className={cn(
                    "h-full rounded-full",
                    riskLevelBarColor[signal.level ?? "low"]
                  )}
                  style={{ width: `${Math.min(100, Math.max(0, signal.value))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState compact icon={Activity} title="Waiting for analysis" />
      )}
    </DashboardCard>
  )
}
