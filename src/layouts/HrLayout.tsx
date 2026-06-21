import type { ReactNode } from "react"
import { Navbar } from "@/components/shared/Navbar"
import { Sidebar } from "@/components/shared/Sidebar"

interface HrLayoutProps {
  children: ReactNode
  activeSection?: string
  onSelectSection?: (id: string) => void
}

export function HrLayout({ children, activeSection, onSelectSection }: HrLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-(--color-surface-subtle)">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar active={activeSection} onSelect={onSelectSection} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
