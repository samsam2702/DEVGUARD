import { useState } from "react"
import { EmployeeLayout } from "@/layouts/EmployeeLayout"
import { ChatWindow } from "@/components/employee/ChatWindow"
import { ChatInput } from "@/components/employee/ChatInput"
import { ConfidentialityNotice } from "@/components/employee/ConfidentialityNotice"
import { CameraToggle } from "@/components/employee/CameraToggle"
import { sendToGrok, type GrokMessage } from "@/lib/grok"
import { useFer } from "@/lib/FerContext"
import type { ChatMessage } from "@/lib/types"

export function EmployeePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  const { setChatAnalysis } = useFer()

  const handleSend = async (content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setIsSending(true)

    try {
      // Simple sentiment: count positive/negative words
      const positiveWords = ["good", "great", "happy", "love", "excellent", "awesome", "thanks", "perfect"]
      const negativeWords = ["bad", "sad", "hate", "terrible", "awful", "angry", "worse"]
      const lower = content.toLowerCase()
      
      const posCount = positiveWords.filter(w => lower.includes(w)).length
      const negCount = negativeWords.filter(w => lower.includes(w)).length
      
      let sentiment: "positive" | "neutral" | "negative" = "neutral"
      if (posCount > negCount) sentiment = "positive"
      else if (negCount > posCount) sentiment = "negative"
      
      const score = sentiment === "positive" ? 0.8 : sentiment === "negative" ? 0.3 : 0.5
      setChatAnalysis({ sentiment, score })

      // Get response from Grok
      const history: GrokMessage[] = [
        {
          role: "system",
          content:
            "You are DevGuard, a warm, casual workplace wellness assistant for interns and employees. Keep responses short, supportive, and conversational. Max 2 sentences.",
        },
        ...nextMessages.map((m) => ({ role: m.role, content: m.content }) as GrokMessage),
      ]
      
      console.log("📤 Sending to Grok:", history)
      const replyText = await sendToGrok(history)
      console.log("📥 Grok response:", replyText)
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: replyText || "I'm here to listen. Tell me more.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Error:", err)
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I had trouble responding. Try again?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <EmployeeLayout>
      <CameraToggle />
      <div className="flex flex-1 flex-col gap-5">
        <div className="min-h-[420px] flex-1 rounded-2xl border border-(--color-border) bg-white p-4 shadow-sm sm:p-5">
          <ChatWindow messages={messages} />
        </div>
        <div className="space-y-3">
          <ChatInput onSend={handleSend} disabled={isSending} />
          <ConfidentialityNotice />
        </div>
      </div>
    </EmployeeLayout>
  )
}
