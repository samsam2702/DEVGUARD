import type { ChatAnalysis } from "./FerContext"
import type { HumeFaceResult, HumeVoiceResult } from "./hume"
import type { RiskLevel, RiskScore, PsychStatus, SignalBreakdownItem } from "./types"

// Emotion names (as returned by Hume) mapped to a 0-100 "distress weight".
// Anything not listed defaults to a mild-neutral weight of 20.
const EMOTION_RISK_WEIGHTS: Record<string, number> = {
  "Distress": 90,
  "Anxiety": 85,
  "Sadness": 75,
  "Anger": 75,
  "Fear": 80,
  "Tiredness": 60,
  "Confusion": 55,
  "Disappointment": 60,
  "Boredom": 40,
  "Calmness": 15,
  "Contentment": 10,
  "Joy": 5,
  "Satisfaction": 10,
  "Relief": 15,
  "Neutral": 25,
}

function emotionRiskScore(dominant: string | undefined, confidence: number | undefined): number | null {
  if (!dominant || confidence === undefined) return null
  const baseWeight = EMOTION_RISK_WEIGHTS[dominant] ?? 35 // unknown emotion -> mild-moderate default
  // Scale by confidence so a low-confidence detection pulls the score toward neutral (50)
  return baseWeight * confidence + 50 * (1 - confidence)
}

function chatRiskScore(chat: ChatAnalysis | null): number | null {
  if (!chat) return null
  // sentiment: positive/neutral/negative, score: 0-1 (assumed "wellness" score, higher = better)
  const sentimentBase = chat.sentiment === "negative" ? 80 : chat.sentiment === "neutral" ? 45 : 15
  // Blend with the numeric wellness score (inverted, since higher wellness = lower risk)
  const invertedScore = (1 - chat.score) * 100
  return Math.round((sentimentBase + invertedScore) / 2)
}

function scoreToLevel(score: number): RiskLevel {
  if (score >= 75) return "high"
  if (score >= 50) return "elevated"
  if (score >= 25) return "moderate"
  return "low"
}

const levelDescriptions: Record<RiskLevel, string> = {
  low: "Signals indicate stable wellbeing. No action needed.",
  moderate: "Some signals worth keeping an eye on. Routine check-in recommended.",
  elevated: "Multiple signals suggest rising stress. Consider reaching out.",
  high: "Strong signals of distress across sources. Prompt follow-up advised.",
}

export interface DerivedRisk {
  risk: RiskScore
  psychStatus: PsychStatus
  signalBreakdown: SignalBreakdownItem[]
}

export function deriveRisk(
  chatAnalysis: ChatAnalysis | null,
  faceResult: HumeFaceResult | null,
  voiceResult: HumeVoiceResult | null
): DerivedRisk | null {
  const chatScore = chatRiskScore(chatAnalysis)
  const faceScore = emotionRiskScore(faceResult?.dominant, faceResult?.confidence)
  const voiceScore = emotionRiskScore(voiceResult?.dominant, voiceResult?.confidence)

  const signals: { id: string; label: string; score: number | null; weight: number }[] = [
    { id: "chat", label: "Chat", score: chatScore, weight: 0.5 },
    { id: "voice", label: "Voice", score: voiceScore, weight: 0.25 },
    { id: "face", label: "Facial", score: faceScore, weight: 0.25 },
  ]

  const available = signals.filter((s) => s.score !== null) as { id: string; label: string; score: number; weight: number }[]
  if (available.length === 0) return null

  // Renormalize weights across only the signals we actually have data for
  const totalWeight = available.reduce((sum, s) => sum + s.weight, 0)
  const combined = available.reduce((sum, s) => sum + (s.score * s.weight) / totalWeight, 0)
  const roundedCombined = Math.round(combined)
  const level = scoreToLevel(roundedCombined)

  const risk: RiskScore = {
    score: roundedCombined,
    maxScore: 100,
    level,
  }

  const psychStatus: PsychStatus = {
    label: level === "low" ? "Stable" : level === "moderate" ? "Monitoring" : level === "elevated" ? "Elevated Stress" : "Needs Attention",
    description: levelDescriptions[level],
    level,
  }

  const signalBreakdown: SignalBreakdownItem[] = available.map((s) => ({
    id: s.id,
    label: s.label,
    value: Math.round(s.score),
    level: scoreToLevel(s.score),
  }))

  return { risk, psychStatus, signalBreakdown }
}