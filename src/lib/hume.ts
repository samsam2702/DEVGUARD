const HUME_API_KEY = import.meta.env.VITE_HUME_API_KEY

export interface HumeFaceEmotion {
  name: string; score: number
}

export interface HumeFaceResult {
  dominant: string; confidence: number; emotions: HumeFaceEmotion[]; timestamp: string
}

export async function analyseFrame(base64Image: string): Promise<HumeFaceResult | null> {
  try {
    const res = await fetch("https://api.hume.ai/v0/batch/jobs", {
      method: "POST",
      headers: { "X-Hume-Api-Key": HUME_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ models: { face: {} }, files: [{ content: base64Image, content_type: "image/jpeg" }] }),
    })
    if (!res.ok) return null
    const job = await res.json()
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 1500))
      const pollRes = await fetch(`https://api.hume.ai/v0/batch/jobs/${job.job_id}/predictions`, { headers: { "X-Hume-Api-Key": HUME_API_KEY } })
      if (!pollRes.ok) continue
      const data = await pollRes.json()
      const emotions: HumeFaceEmotion[] = data?.[0]?.results?.predictions?.[0]?.models?.face?.grouped_predictions?.[0]?.predictions?.[0]?.emotions ?? []
      if (emotions.length === 0) continue
      const sorted = [...emotions].sort((a, b) => b.score - a.score)
      return { dominant: sorted[0].name, confidence: sorted[0].score, emotions: sorted.slice(0, 6), timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
    }
    return null
  } catch { return null }
}

export interface HumeVoiceResult {
  dominant: string; confidence: number; emotions: HumeFaceEmotion[]; timestamp: string
}

export async function analyseVoice(audioBlob: Blob): Promise<HumeVoiceResult | null> {
  try {
    const formData = new FormData()
    formData.append("json", JSON.stringify({ models: { prosody: {} } }))
    formData.append("file", audioBlob, "audio.wav")
    const res = await fetch("https://api.hume.ai/v0/batch/jobs", { method: "POST", headers: { "X-Hume-Api-Key": HUME_API_KEY }, body: formData })
    if (!res.ok) return null
    const job = await res.json()
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 1500))
      const pollRes = await fetch(`https://api.hume.ai/v0/batch/jobs/${job.job_id}/predictions`, { headers: { "X-Hume-Api-Key": HUME_API_KEY } })
      if (!pollRes.ok) continue
      const data = await pollRes.json()
      const emotions: HumeFaceEmotion[] = data?.[0]?.results?.predictions?.[0]?.models?.prosody?.grouped_predictions?.[0]?.predictions?.[0]?.emotions ?? []
      if (emotions.length === 0) continue
      const sorted = [...emotions].sort((a, b) => b.score - a.score)
      return { dominant: sorted[0].name, confidence: sorted[0].score, emotions: sorted.slice(0, 6), timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
    }
    return null
  } catch { return null }
}
