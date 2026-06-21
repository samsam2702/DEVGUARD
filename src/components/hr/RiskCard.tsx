import { Gauge, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/EmptyState"
import { riskLevelBadgeVariant, riskLevelBarColor, riskLevelLabel } from "@/lib/risk"
import type { RiskScore } from "@/lib/types"
import { cn } from "@/lib/utils"

interface RiskCardProps {
  risk?: RiskScore
}

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
}

export function RiskCard({ risk }: RiskCardProps) {
  if (!risk) {
    return (
      <DashboardCard title="Combined Risk Score" icon={Gauge}>
        <EmptyState compact icon={Gauge} title="No data available" />
      </DashboardCard>
    )
  }

  const TrendIcon = risk.trend ? trendIcon[risk.trend] : null
  const percentage = Math.min(100, Math.max(0, (risk.score / risk.maxScore) * 100))

  return (
    <DashboardCard title="Combined Risk Score" icon={Gauge}>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-(--color-ink)">
              {risk.score}
            </span>
            <span className="text-sm text-(--color-ink-faint)">/ {risk.maxScore}</span>
          </div>
          <div className="flex items-center gap-2">
            {TrendIcon && (
              <TrendIcon className="h-3.5 w-3.5 text-(--color-ink-faint)" strokeWidth={2} />
            )}
            <Badge variant={riskLevelBadgeVariant[risk.level]}>
              {riskLevelLabel[risk.level]} risk
            </Badge>
          </div>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-(--color-surface-muted)">
          <div
            className={cn("h-full rounded-full transition-all", riskLevelBarColor[risk.level])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </DashboardCard>
  )
}
