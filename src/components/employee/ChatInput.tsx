import { useState, type FormEvent } from "react"
import { Mic, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend?: (value: string) => void
  onToggleMic?: () => void
  isRecording?: boolean
  disabled?: boolean
}

export function ChatInput({ onSend, onToggleMic, isRecording = false, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSend?.(trimmed)
    setValue("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-2xl border border-(--color-border) bg-white p-1.5 pl-2 shadow-sm focus-within:border-(--color-accent) focus-within:ring-2 focus-within:ring-(--color-accent-soft)"
    >
      <button
        type="button"
        onClick={onToggleMic}
        aria-pressed={isRecording}
        aria-label={isRecording ? "Stop voice input" : "Start voice input"}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
          isRecording
            ? "bg-(--color-risk-soft) text-(--color-risk)"
            : "text-(--color-ink-faint) hover:bg-(--color-surface-muted) hover:text-(--color-ink-soft)"
        )}
      >
        <Mic className="h-[18px] w-[18px]" strokeWidth={2} />
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
    </form>
  )
}
