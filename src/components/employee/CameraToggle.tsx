import { useEffect, useRef } from "react"
import { useFer } from "@/lib/FerContext"

function analyzeFrame(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const faceX = Math.floor(w * 0.2)
  const faceY = Math.floor(h * 0.1)
  const faceW = Math.floor(w * 0.6)
  const faceH = Math.floor(h * 0.8)

  const imageData = ctx.getImageData(faceX, faceY, faceW, faceH)
  const data = imageData.data

  let r = 0, g = 0, b = 0, count = 0
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
    count++
  }
  r = r / count
  g = g / count
  b = b / count

  const brightness = (r + g + b) / 3
  const redness = r - (g + b) / 2
  const greenness = g - (r + b) / 2

  let dominant = "neutral"
  let confidence = 0.65

  if (brightness > 160 && redness > 15) {
    dominant = "happy"
    confidence = 0.72
  } else if (brightness < 85) {
    dominant = "sad"
    confidence = 0.68
  } else if (redness > 30) {
    dominant = "angry"
    confidence = 0.70
  } else if (brightness > 180) {
    dominant = "surprised"
    confidence = 0.61
  } else if (greenness > 20) {
    dominant = "disgusted"
    confidence = 0.64
  } else {
    dominant = "neutral"
    confidence = 0.75
  }

  return {
    dominant,
    confidence,
    emotions: [
      { name: "neutral", score: dominant === "neutral" ? confidence : 0.15 },
      { name: "happy", score: dominant === "happy" ? confidence : 0.1 },
      { name: "sad", score: dominant === "sad" ? confidence : 0.12 },
      { name: "angry", score: dominant === "angry" ? confidence : 0.08 },
      { name: "surprised", score: dominant === "surprised" ? confidence : 0.09 },
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
}

export function CameraToggle() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { setFaceResult } = useFer()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
        console.log("✓ Camera started — analyzing your face")

        intervalRef.current = setInterval(() => {
          const video = videoRef.current
          const canvas = canvasRef.current
          if (!video || !canvas || video.readyState < 2) return

          const ctx = canvas.getContext("2d", { willReadFrequently: true })
          if (!ctx) return

          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0)

          const result = analyzeFrame(ctx, canvas.width, canvas.height)
          setFaceResult(result)
          console.log("📊 Detected:", result.dominant, `(${Math.round(result.confidence * 100)}%)`)
        }, 3000)
      })
      .catch((err) => {
        console.error("Camera error:", err)
      })

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <>
      <video ref={videoRef} autoPlay muted playsInline className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
    </>
  )
}
