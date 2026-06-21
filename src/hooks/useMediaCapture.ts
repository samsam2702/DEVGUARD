import { useState, useCallback } from "react"

interface UseMediaCaptureResult {
  isActive: boolean
  enable: () => void
  disable: () => void
  toggle: () => void
}

/**
 * Tracks on/off state for a capture device (camera or microphone) at the UI level.
 * Intended to be wired to real getUserMedia / WebRTC logic when a backend
 * and signal-processing pipeline are connected.
 */
export function useMediaCapture(initial = false): UseMediaCaptureResult {
  const [isActive, setIsActive] = useState(initial)

  const enable = useCallback(() => setIsActive(true), [])
  const disable = useCallback(() => setIsActive(false), [])
  const toggle = useCallback(() => setIsActive((prev) => !prev), [])

  return { isActive, enable, disable, toggle }
}
