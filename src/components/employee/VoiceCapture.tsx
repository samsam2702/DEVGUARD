import { useRef, useState } from "react"
import { Mic, MicOff } from "lucide-react"
import { useFer } from "@/lib/FerContext"
import { analyseVoice } from "@/lib/hume"
import { cn } from "@/lib/utils"

export function VoiceCapture() {
  const [isRecording, setIsRecording] = useState(false)
  const [status, setStatus] = useState<string>("")
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const { setVoiceResult } = useFer()

  const handleToggle = async () => {
    if (isRecording) { mediaRecorderRef.current?.stop(); setIsRecording(false); return }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" })
        stream.getTracks().forEach(t => t.stop())
        setStatus("Analysing voice...")
        const result = await analyseVoice(blob)
        if (result) { setVoiceResult(result); setStatus("Done") }
        else setStatus("Could not analyse")
        setTimeout(() => setStatus(""), 2000)
      }
      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
      setStatus("Recording...")
    } catch { setStatus("Mic unavailable") }
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-(--color-border) bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", isRecording ? "bg-(--color-risk-soft)" : "bg-(--color-surface-muted)")}>
          {isRecording ? <Mic className="h-4 w-4 text-(--color-risk)" strokeWidth={2} /> : <MicOff className="h-4 w-4 text-(--color-ink-faint)" strokeWidth={2} />}
        </div>
        <div><p className="text-sm font-medium text-(--color-ink)">Voice analysis</p><p className="text-xs text-(--color-ink-faint)">{status || (isRecording ? "Recording — click to stop and analyse" : "Click to record a voice sample")}</p></div>
      </div>
      <button type="button" onClick={handleToggle} className={cn("rounded-lg px-3 py-1.5 text-xs font-medium transition-colors", isRecording ? "bg-(--color-risk-soft) text-(--color-risk) hover:bg-red-100" : "bg-(--color-accent) text-white hover:bg-(--color-accent-hover)")}>{isRecording ? "Stop & analyse" : "Start recording"}</button>
    </div>
  )
}
