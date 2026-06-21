import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return <div className="min-h-screen w-full bg-(--color-surface-subtle)">{children}</div>
}
