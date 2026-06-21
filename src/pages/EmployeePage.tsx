import { useState } from "react"
import { EmployeeLayout } from "@/layouts/EmployeeLayout"
import { ChatWindow } from "@/components/employee/ChatWindow"
import { ChatInput } from "@/components/employee/ChatInput"
import { ConfidentialityNotice } from "@/components/employee/ConfidentialityNotice"
import type { ChatMessage } from "@/lib/types"
import { CameraToggle } from "@/components/employee/CameraToggle"

export function EmployeePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isRecording, setIsRecording] = useState(false)

  const handleSend = (content: string) => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, message])
  }

  return (
  <EmployeeLayout>
    <div className="flex flex-1 flex-col gap-5">
      <div className="min-h-[420px] flex-1 rounded-2xl border border-(--color-border) bg-white p-4 shadow-sm sm:p-5">
        <ChatWindow messages={messages} />
      </div>

      <div className="space-y-3">
        <ChatInput
          onSend={handleSend}
          onToggleMic={() => setIsRecording((prev) => !prev)}
          isRecording={isRecording}
        />
        <ConfidentialityNotice />
        <CameraToggle />
      </div>
    </div>
  </EmployeeLayout>
)
}
