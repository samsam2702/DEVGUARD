import type { LucideIcon } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { Badge } from "@/components/ui/badge"
import { riskLevelBadgeVariant, riskLevelLabel } from "@/lib/risk"
import type { RiskLevel } from "@/lib/types"

interface AnalysisMetric {
  id: string
  label: string
  value: string
}

interface AnalysisCardProps {
  title: string
  description?: string
  icon: LucideIcon
  level?: RiskLevel
  metrics?: AnalysisMetric[]
}

export function AnalysisCard({ title, description, icon, level, metrics }: AnalysisCardProps) {
  return (
    <DashboardCard
      title={title}
      description={description}
      icon={icon}
      action={level && <Badge variant={riskLevelBadgeVariant[level]}>{riskLevelLabel[level]}</Badge>}
    >
      {metrics && metrics.length > 0 ? (
        <dl className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="space-y-0.5">
              <dt className="text-xs text-(--color-ink-faint)">{metric.label}</dt>
              <dd className="text-sm font-semibold text-(--color-ink)">{metric.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <EmptyState compact icon={icon} title="Waiting for analysis" />
      )}
    </DashboardCard>
  )
}
