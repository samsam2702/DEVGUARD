import { useState } from "react"
import { MessageSquare, Mic, ClipboardList, Activity } from "lucide-react"
import { HrLayout } from "@/layouts/HrLayout"
import { StatusCard } from "@/components/hr/StatusCard"
import { RiskCard } from "@/components/hr/RiskCard"
import { RootCauseCard } from "@/components/hr/RootCauseCard"
import { SignalBreakdown } from "@/components/hr/SignalBreakdown"
import { SummaryCard } from "@/components/hr/SummaryCard"
import { SystemStatusCard } from "@/components/hr/SystemStatusCard"
import { AnalysisCard } from "@/components/hr/AnalysisCard"
import { FerDashboardCard } from "@/components/hr/FerDashboardCard"
import { VoiceDashboardCard } from "@/components/hr/VoiceDashboardCard"
import { EmployeeListPanel } from "@/components/hr/EmployeeListPanel"
import type { EmployeeSummary, RiskLevel } from "@/lib/types"

export function HrPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(undefined)

  // No data is fabricated. These remain undefined/empty until a backend
  // integration supplies real values, at which point each card renders
  // its populated state automatically.
  const employees: (EmployeeSummary & { riskLevel?: RiskLevel })[] = []

  return (
    <HrLayout>
      <div className="mb-7 space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-(--color-ink)">
          Management Analytics Dashboard
        </h1>
        <p className="text-sm text-(--color-ink-faint)">
          Aggregated behavioral signals across chat, voice and facial analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <EmployeeListPanel
            employees={employees}
            selectedId={selectedEmployeeId}
            onSelect={setSelectedEmployeeId}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
          <StatusCard title="Employee Status" />
          <StatusCard title="Psychological Status" />
          <RiskCard />
          <SystemStatusCard />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <RootCauseCard />
        <SignalBreakdown />
        <SummaryCard
          title="Behavioral Summary"
          description="Narrative overview of recent signals"
          icon={ClipboardList}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AnalysisCard title="Chat Analysis" description="Sentiment derived from text conversations" icon={MessageSquare} />
        <VoiceDashboardCard />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FerDashboardCard />
        <SummaryCard
          title="Monitoring Summary"
          description="Current monitoring coverage and cadence"
          icon={Activity}
        />
      </div>
    </HrLayout>
  )
}
