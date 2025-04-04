"use client"
import Link from "next/link" // Correct import for navigation
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { Input } from "./ui/input"
import { ModeToggle } from "./theme-toggle"
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"
import { LayoutDashboard } from "lucide-react"
import { useApi } from "@/lib/hooks/use-api"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header
    className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-background",
    )}
  >      <div className="container flex h-16 items-center space-x-2">
        <div className="md:hidden">
          <MobileNav />
        </div>
          <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">TESE</span>
          </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link href="/products" className="transition-colors hover:text-foreground/80">
            Products
          </Link>
          <Link href="/categories" className="transition-colors hover:text-foreground/80">
            Categories
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80">
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="ml-2" asChild>
            <Link href="/search">
              <Search className="h-5 w-5 md:hidden" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="ml-2" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="ml-2 relative" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Link>
          </Button>
          <ModeToggle />
          <div className="flextext-white rounded-sm  items-center space-x-3">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <AdminLink />
          </div>
        </div>
      </div>
    </header>
  )
}

function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false)
  const { data } = useApi<any>("/api/admin/check")

  useEffect(() => {
    if (data?.data?.isAdmin) {
      setIsAdmin(true)
      console.log("USER IS ADMIN", data)
    }
  }, [data])

  if (!isAdmin) return null

  return (
    <Button variant="ghost" size="icon" className="ml-2" asChild>
      <Link href="/admin">
        <LayoutDashboard className="h-5 w-5" />
        <span className="sr-only">Admin Dashboard</span>
      </Link>
    </Button>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-0 top-0 h-full w-full max-w-xs border-r bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6" />
                <span className="font-bold">ACME Store</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="mt-6">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8"
                  />
                </div>
              </form>
            </div>
            <nav className="mt-6 flex flex-col space-y-4 text-lg font-medium">
              <Link href="/" className="transition-colors hover:text-foreground/80" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link
                href="/products"
                className="transition-colors hover:text-foreground/80"
                onClick={() => setOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="transition-colors hover:text-foreground/80"
                onClick={() => setOpen(false)}
              >
                Categories
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-foreground/80"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

