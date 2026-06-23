export interface VoiceAnalysisResult {
  dominant: string
  confidence: number
  emotions: Array<{ name: string; score: number }>
  timestamp: string
}

export function analyzeVoiceAudio(audioBuffer: AudioBuffer): VoiceAnalysisResult {
  const rawData = audioBuffer.getChannelData(0)
  
  let loudness = 0
  for (let i = 0; i < rawData.length; i++) {
    loudness += Math.abs(rawData[i])
  }
  loudness = loudness / rawData.length

  // Pitch/energy variation
  let variation = 0
  const step = Math.floor(rawData.length / 50)
  for (let i = step; i < rawData.length; i += step) {
    variation += Math.abs(rawData[i] - rawData[i - step])
  }
  variation = variation / 50

  let dominant = "neutral"
  let confidence = 0.65

  // Very loose thresholds - easier to detect emotions
  if (loudness > 0.05 || variation > 0.025) {
    dominant = "happy"
    confidence = 0.70
  } else if (loudness > 0.12) {
    dominant = "angry"
    confidence = 0.72
  } else if (loudness < 0.02) {
    dominant = "sad"
    confidence = 0.68
  } else {
    dominant = "neutral"
    confidence = 0.65
  }

  return {
    dominant,
    confidence,
    emotions: [
      { name: "neutral", score: dominant === "neutral" ? confidence : 0.12 },
      { name: "happy", score: dominant === "happy" ? confidence : 0.1 },
      { name: "sad", score: dominant === "sad" ? confidence : 0.11 },
      { name: "angry", score: dominant === "angry" ? confidence : 0.08 },
      { name: "surprised", score: dominant === "surprised" ? confidence : 0.09 },
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
}
