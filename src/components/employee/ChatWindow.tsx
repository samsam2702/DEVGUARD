import { useEffect, useRef } from "react"
import { MessageSquareText } from "lucide-react"
import { ChatBubble } from "./ChatBubble"
import { EmptyState } from "@/components/shared/EmptyState"
import type { ChatMessage } from "@/lib/types"

interface ChatWindowProps {
  messages: ChatMessage[]
}

export function ChatWindow({ messages }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState
          icon={MessageSquareText}
          title="No conversation available"
          description="Start a message below to begin a confidential session with your DevGuard assistant."
        />
      </div>
    )
  }

  return (
    <div className="scrollbar-thin flex h-full flex-col gap-4 overflow-y-auto px-1 py-2">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
