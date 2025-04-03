import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/components/cart-provider"
import NewsletterPopup from "@/components/newsletter-popup"


const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Modern e-commerce platform built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en"  className={inter.className } suppressHydrationWarning>
        <body suppressHydrationWarning className="">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 ">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <NewsletterPopup/>
            </CartProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

