import { Link } from "react-router-dom"
import { UserRound, ShieldCheck, ArrowRight } from "lucide-react"
import { Logo } from "@/components/shared/Logo"
import { Card } from "@/components/ui/card"

export function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-(--color-surface-subtle) px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo iconClassName="h-11 w-11" className="mb-5 [&>span]:text-2xl" />
          <p className="text-sm text-(--color-ink-faint)">
            AI Workplace Behavioral Intelligence Platform
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="mb-6 space-y-1">
            <h1 className="text-lg font-semibold text-(--color-ink)">Sign in to DevGuard</h1>
            <p className="text-sm text-(--color-ink-faint)">
              Choose how you'd like to access the platform.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to="/employee"
              className="group flex items-center justify-between rounded-xl border border-(--color-border) bg-white p-4 transition-colors hover:border-(--color-accent-border) hover:bg-(--color-accent-soft)"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--color-surface-muted) group-hover:bg-white">
                  <UserRound className="h-5 w-5 text-(--color-ink-soft)" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-medium text-(--color-ink)">Employee Login</p>
                  <p className="text-xs text-(--color-ink-faint)">
                    Access your confidential assistant
                  </p>
                </div>
              </div>
              <ArrowRight
                className="h-4 w-4 text-(--color-ink-faint) transition-transform group-hover:translate-x-0.5 group-hover:text-(--color-accent)"
                strokeWidth={2}
              />
            </Link>

            <Link
              to="/hr"
              className="group flex items-center justify-between rounded-xl border border-(--color-border) bg-white p-4 transition-colors hover:border-(--color-accent-border) hover:bg-(--color-accent-soft)"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--color-surface-muted) group-hover:bg-white">
                  <ShieldCheck className="h-5 w-5 text-(--color-ink-soft)" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-medium text-(--color-ink)">HR / Manager Login</p>
                  <p className="text-xs text-(--color-ink-faint)">
                    View workplace analytics dashboard
                  </p>
                </div>
              </div>
              <ArrowRight
                className="h-4 w-4 text-(--color-ink-faint) transition-transform group-hover:translate-x-0.5 group-hover:text-(--color-accent)"
                strokeWidth={2}
              />
            </Link>
          </div>
        </Card>

        <p className="mt-6 text-center text-xs text-(--color-ink-faint)">
          By continuing, you agree to DevGuard's workplace usage and confidentiality policies.
        </p>
      </div>
    </div>
  )
}
