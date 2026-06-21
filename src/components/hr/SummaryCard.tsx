import type { LucideIcon } from "lucide-react"
import { FileText } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { EmptyState } from "@/components/shared/EmptyState"

interface SummaryCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  summary?: string
}

export function SummaryCard({ title, description, icon = FileText, summary }: SummaryCardProps) {
  return (
    <DashboardCard title={title} description={description} icon={icon}>
      {summary ? (
        <p className="text-sm leading-relaxed text-(--color-ink-soft)">{summary}</p>
      ) : (
        <EmptyState compact icon={icon} title="No data available" />
      )}
    </DashboardCard>
  )
}
