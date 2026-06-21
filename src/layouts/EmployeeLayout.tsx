import type { ReactNode } from "react"
import { Header } from "@/components/shared/Header"

interface EmployeeLayoutProps {
  children: ReactNode
}

export function EmployeeLayout({ children }: EmployeeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-(--color-surface-subtle)">
      <Header subtitle="Your confidential workplace companion" />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  )
}
