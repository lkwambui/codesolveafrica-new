import { type ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { QueryProvider } from './query-provider'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="codesolve-theme">
      <QueryProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </QueryProvider>
    </ThemeProvider>
  )
}
