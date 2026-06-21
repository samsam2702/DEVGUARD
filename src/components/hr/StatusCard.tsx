import { UserRound } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/EmptyState"
import { riskLevelBadgeVariant, riskLevelLabel } from "@/lib/risk"
import type { PsychStatus } from "@/lib/types"

interface StatusCardProps {
  title: string
  status?: PsychStatus
}

export function StatusCard({ title, status }: StatusCardProps) {
  return (
    <DashboardCard title={title} icon={UserRound}>
      {status ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-(--color-ink)">{status.label}</p>
            {status.level && (
              <Badge variant={riskLevelBadgeVariant[status.level]}>
                {riskLevelLabel[status.level]}
              </Badge>
            )}
          </div>
          {status.description && (
            <p className="text-sm text-(--color-ink-soft)">{status.description}</p>
          )}
        </div>
      ) : (
        <EmptyState compact icon={UserRound} title="No employee selected" />
      )}
    </DashboardCard>
  )
}
