import { Users } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { EmployeeCard } from "./EmployeeCard"
import { EmptyState } from "@/components/shared/EmptyState"
import type { EmployeeSummary, RiskLevel } from "@/lib/types"

interface EmployeeListPanelProps {
  employees?: (EmployeeSummary & { riskLevel?: RiskLevel })[]
  selectedId?: string
  onSelect?: (id: string) => void
}

export function EmployeeListPanel({ employees, selectedId, onSelect }: EmployeeListPanelProps) {
  return (
    <DashboardCard
      title="Employee Wellness Monitoring"
      description="Select an employee to view detailed signals"
      icon={Users}
    >
      {employees && employees.length > 0 ? (
        <div className="scrollbar-thin max-h-80 space-y-2 overflow-y-auto pr-1">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              riskLevel={employee.riskLevel}
              selected={employee.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <EmptyState compact icon={Users} title="No employee selected" />
      )}
    </DashboardCard>
  )
}
