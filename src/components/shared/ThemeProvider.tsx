import { createContext, useContext, useEffect, type ReactNode } from "react"

type Theme = "light"

interface ThemeContextValue {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "light" })

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * DevGuard ships a single, deliberate light enterprise theme.
 * This provider exists so the theme can be extended (e.g. dark mode)
 * without changing consuming components.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light")
  }, [])

  return <ThemeContext.Provider value={{ theme: "light" }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
