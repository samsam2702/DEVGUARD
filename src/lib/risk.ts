import type { RiskLevel } from "@/lib/types"
import type { BadgeProps } from "@/components/ui/badge"

export const riskLevelLabel: Record<RiskLevel, string> = {
  low: "Low",
  moderate: "Moderate",
  elevated: "Elevated",
  high: "High",
}

export const riskLevelBadgeVariant: Record<RiskLevel, NonNullable<BadgeProps["variant"]>> = {
  low: "good",
  moderate: "accent",
  elevated: "warn",
  high: "risk",
}

export const riskLevelBarColor: Record<RiskLevel, string> = {
  low: "bg-(--color-good)",
  moderate: "bg-(--color-accent)",
  elevated: "bg-(--color-warn)",
  high: "bg-(--color-risk)",
}
