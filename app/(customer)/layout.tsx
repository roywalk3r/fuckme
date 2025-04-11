import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { getSettings } from "@/lib/settings"

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()

  return (
    <div className="flex min-h-screen flex-col">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <MainNav settings={settings} />
            <div className="hidden flex-1 items-center justify-end md:flex">
              <UserNav />
            </div>
            <div className="flex md:hidden">
              <MobileNav settings={settings} />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <Toaster />
      </ThemeProvider>
    </div>
  )
}

