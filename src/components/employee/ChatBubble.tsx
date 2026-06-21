import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/lib/types"

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm sm:max-w-[65%]",
          isUser
            ? "rounded-br-md bg-(--color-accent) text-white"
            : "rounded-bl-md border border-(--color-border) bg-white text-(--color-ink)"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span
          className={cn(
            "mt-1 block text-[10px]",
            isUser ? "text-blue-100" : "text-(--color-ink-faint)"
          )}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  )
}
