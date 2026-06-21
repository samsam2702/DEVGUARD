import { Link } from "react-router-dom"
import { LogOut } from "lucide-react"
import { Logo } from "./Logo"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  subtitle?: string
}

/**
 * Top navigation bar for the HR / Manager interface.
 * Kept separate from the employee Header so the two role
 * surfaces never share navigation affordances.
 */
export function Navbar({ subtitle = "Management Analytics Dashboard" }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-(--color-border) bg-white px-5 sm:px-8">
      <div className="flex items-baseline gap-3">
        <Logo />
        <span className="hidden h-4 w-px bg-(--color-border-strong) sm:block" />
        <span className="hidden text-sm text-(--color-ink-faint) sm:block">{subtitle}</span>
      </div>
      <Button asChild variant="ghost" size="sm">
        <Link to="/">
          <LogOut className="h-3.5 w-3.5" strokeWidth={2} />
          Sign out
        </Link>
      </Button>
    </nav>
  )
}
