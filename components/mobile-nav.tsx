"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Search, User, Heart, Home, ShoppingBag, Grid, Info, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"

export default async function MobileNav() {
  const pathname = usePathname()
  const { userId } =  await  auth()

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Shop", icon: ShoppingBag },
    { href: "/categories", label: "Categories", icon: Grid },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <div className="flex flex-col h-full pt-6">
      <motion.div
        className="relative mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search products..." className="w-full pl-9 rounded-full bg-muted" />
      </motion.div>

      <motion.nav className="flex flex-col gap-4" variants={container} initial="hidden" animate="show">
        {routes.map((route) => {
          const Icon = route.icon
          return (
            <motion.div key={route.href} variants={item}>
              <Link
                href={route.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  pathname === route.href ? "text-primary bg-muted" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {route.label}
              </Link>
            </motion.div>
          )
        })}
      </motion.nav>

      <Separator className="my-6" />

      <motion.div className="flex flex-col gap-4" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Link href="/wishlist" className="flex items-center gap-2 text-sm font-medium p-2">
            <Heart className="h-4 w-4" />
            Wishlist
          </Link>
        </motion.div>

        {userId ? (
          <motion.div variants={item}>
             <UserButton />
           </motion.div>
        ) : (
          <motion.div className="flex flex-col gap-2" variants={item}>
             <SignInButton />
            <SignOutButton/>
           </motion.div>
        )}
      </motion.div>
    </div>
  )
}

