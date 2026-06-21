// Chat -----------------------------------------------------------------

export type ChatRole = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp: string
}

// HR / Analytics ---------------------------------------------------------

export type RiskLevel = "low" | "moderate" | "elevated" | "high"

export interface EmployeeSummary {
  id: string
  name: string
  department?: string
  status?: string
  lastActive?: string
}

export interface PsychStatus {
  label: string
  description?: string
  level?: RiskLevel
}

export interface RiskScore {
  score: number
  maxScore: number
  level: RiskLevel
  trend?: "up" | "down" | "stable"
}

export interface SignalBreakdownItem {
  id: string
  label: string
  value: number
  level?: RiskLevel
}

export interface RootCauseItem {
  id: string
  label: string
  description?: string
  weight?: number
}

export interface SystemStatusItem {
  id: string
  label: string
  state: "online" | "offline" | "degraded"
  detail?: string
}
