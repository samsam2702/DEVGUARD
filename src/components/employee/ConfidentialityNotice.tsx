import { Lock } from "lucide-react"

export function ConfidentialityNotice() {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-(--color-surface-muted) px-4 py-3">
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-(--color-ink-faint)" strokeWidth={2} />
      <p className="text-xs leading-relaxed text-(--color-ink-faint)">
        This conversation is confidential. DevGuard analyzes behavioral signals to support your
        wellbeing and is not used for disciplinary purposes. Individual conversations are never
        shared verbatim with managers or HR.
      </p>
    </div>
  )
}
