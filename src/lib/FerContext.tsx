import { createContext, useContext, useState, type ReactNode } from "react"

export interface ChatAnalysis {
  sentiment: "positive" | "neutral" | "negative"
  score: number
}

interface AnalysisContextValue {
  faceResult: any
  faceHistory: any[]
  voiceResult: any
  voiceHistory: any[]
  chatAnalysis: ChatAnalysis | null
  setFaceResult: (r: any) => void
  setVoiceResult: (r: any) => void
  setChatAnalysis: (r: ChatAnalysis) => void
}

const AnalysisContext = createContext<AnalysisContextValue>({
  faceResult: null,
  faceHistory: [],
  voiceResult: null,
  voiceHistory: [],
  chatAnalysis: null,
  setFaceResult: () => {},
  setVoiceResult: () => {},
  setChatAnalysis: () => {},
})

export function FerProvider({ children }: { children: ReactNode }) {
  const [faceResult, setFaceResultState] = useState<any>(null)
  const [faceHistory, setFaceHistory] = useState<any[]>([])
  const [voiceResult, setVoiceResultState] = useState<any>(null)
  const [voiceHistory, setVoiceHistory] = useState<any[]>([])
  const [chatAnalysis, setChatAnalysisState] = useState<ChatAnalysis | null>(null)

  const setFaceResult = (r: any) => {
    setFaceResultState(r)
    setFaceHistory((prev) => [...prev.slice(-19), r])
  }

  const setVoiceResult = (r: any) => {
    setVoiceResultState(r)
    setVoiceHistory((prev) => [...prev.slice(-19), r])
  }

  const setChatAnalysis = (r: ChatAnalysis) => {
    setChatAnalysisState(r)
  }

  return (
    <AnalysisContext.Provider value={{ faceResult, faceHistory, voiceResult, voiceHistory, chatAnalysis, setFaceResult, setVoiceResult, setChatAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export function useFer() {
  return useContext(AnalysisContext)
}
