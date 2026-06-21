import { UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { riskLevelBadgeVariant, riskLevelLabel } from "@/lib/risk"
import type { EmployeeSummary, RiskLevel } from "@/lib/types"
import { cn } from "@/lib/utils"

interface EmployeeCardProps {
  employee: EmployeeSummary
  riskLevel?: RiskLevel
  selected?: boolean
  onSelect?: (id: string) => void
}

export function EmployeeCard({ employee, riskLevel, selected, onSelect }: EmployeeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(employee.id)}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
        selected
          ? "border-(--color-accent-border) bg-(--color-accent-soft)"
          : "border-(--color-border) bg-white hover:bg-(--color-surface-subtle)"
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-surface-muted)">
        <UserRound className="h-4 w-4 text-(--color-ink-faint)" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-(--color-ink)">{employee.name}</p>
        {employee.department && (
          <p className="truncate text-xs text-(--color-ink-faint)">{employee.department}</p>
        )}
      </div>
      {riskLevel && (
        <Badge variant={riskLevelBadgeVariant[riskLevel]} className="shrink-0">
          {riskLevelLabel[riskLevel]}
        </Badge>
      )}
    </button>
  )
}
