import { useEffect, useRef, useState } from "react"
import { Camera, CameraOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface CameraToggleProps {
  onStreamChange?: (stream: MediaStream | null) => void
}

export function CameraToggle({ onStreamChange }: CameraToggleProps) {
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    onStreamChange?.(null)
  }

  const handleToggle = async () => {
    setError(null)
    if (isActive) {
      stopStream()
      setIsActive(false)
      return
    }

    const confirmed = window.confirm(
      "Turn on your camera? DevGuard will analyze facial expression signals " +
        "while it's active. You can turn it off anytime."
    )
    if (!confirmed) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      onStreamChange?.(stream)
      setIsActive(true)
    } catch {
      setError("Camera access was denied or unavailable.")
    }
  }

  useEffect(() => stopStream, [])

  return (
    <div className="flex items-center justify-between rounded-xl border border-(--color-border) bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg",
            isActive ? "bg-(--color-accent-soft)" : "bg-(--color-surface-muted)"
          )}
        >
          {isActive ? (
            <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
          ) : (
            <CameraOff className="h-4 w-4 text-(--color-ink-faint)" strokeWidth={2} />
          )}
          {isActive && (
            <span className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-(--color-risk) ring-2 ring-white" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-(--color-ink)">Facial analysis</p>
          <p className="text-xs text-(--color-ink-faint)">
            {isActive ? "Camera is on" : "Camera is off"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
          isActive
            ? "bg-(--color-surface-muted) text-(--color-ink-soft) hover:bg-(--color-border)"
            : "bg-(--color-accent) text-white hover:bg-(--color-accent-hover)"
        )}
      >
        {isActive ? "Turn off" : "Turn on"}
      </button>
      {error && <span className="ml-2 text-xs text-(--color-risk)">{error}</span>}
    </div>
  )
}