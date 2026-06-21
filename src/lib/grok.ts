const GROK_API_URL = "https://api.x.ai/v1/chat/completions"

export interface GrokMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export async function sendToGrok(messages: GrokMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GROK_API_KEY

  const response = await fetch(GROK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4",
      messages,
    }),
  })

  if (!response.ok) {
    throw new Error(`Grok API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response."
}