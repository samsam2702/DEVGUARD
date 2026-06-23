import { useState, type FormEvent, useRef } from "react"
import { Mic, Send } from "lucide-react"
import { useFer } from "@/lib/FerContext"
import { analyzeVoiceAudio } from "@/lib/voiceAnalysis"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend?: (value: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const { setVoiceResult } = useFer()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSend?.(trimmed)
    setValue("")
  }

  const handleMicToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" })
        stream.getTracks().forEach((t) => t.stop())

        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const arrayBuffer = await blob.arrayBuffer()
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
          
          const result = analyzeVoiceAudio(audioBuffer)
          setVoiceResult(result)
          console.log("🎤 Voice analysed:", result.dominant)
        } catch (err) {
          console.error("Voice analysis error:", err)
        }
      }

      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
    } catch {
      console.error("Mic unavailable")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex w-full items-center gap-2 rounded-2xl border border-(--color-border) bg-white p-1.5 pl-2 shadow-sm focus-within:border-(--color-accent) focus-within:ring-2 focus-within:ring-(--color-accent-soft)">
        <button
          type="button"
          onClick={handleMicToggle}
          aria-pressed={isRecording}
          aria-label={isRecording ? "Stop voice input" : "Start voice input"}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all",
            isRecording
              ? "bg-(--color-risk-soft) relative"
              : "text-(--color-ink-faint) hover:bg-(--color-surface-muted) hover:text-(--color-ink-soft)"
          )}
        >
          {isRecording ? (
            <>
              <style>{`
                @keyframes wave {
                  0%, 100% { height: 4px; }
                  50% { height: 16px; }
                }
                .wave-bar {
                  width: 2px;
                  background: #dc2626;
                  animation: wave 0.6s ease-in-out infinite;
                  margin: 0 1px;
                }
              `}</style>
              <div className="flex items-end justify-center gap-1 h-6 w-6">
                <div className="wave-bar" style={{ animationDelay: "0s" }}></div>
                <div className="wave-bar" style={{ animationDelay: "0.2s" }}></div>
                <div className="wave-bar" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </>
          ) : (
            <Mic className="h-[18px] w-[18px]" strokeWidth={2} />
          )}
        </button>

        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          type="text"
          placeholder="Type a message to your DevGuard assistant…"
          disabled={disabled}
          className="h-9 flex-1 bg-transparent text-sm text-(--color-ink) placeholder:text-(--color-ink-faint) focus:outline-none disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={disabled || value.trim().length === 0}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--color-accent) text-white transition-colors hover:bg-(--color-accent-hover) disabled:cursor-not-allowed disabled:bg-(--color-border-strong)"
        >
          <Send className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>
    </form>
  )
}
