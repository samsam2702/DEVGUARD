import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconClassName?: string
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-accent)",
          iconClassName
        )}
      >
        <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.25} />
      </div>
      <span className="text-[17px] font-bold tracking-tight text-(--color-ink)">
        DevGuard
      </span>
    </div>
  )
}
