"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface NewsletterSubscriptionProps {
  variant?: "inline" | "card"
  className?: string
}

export default function NewsletterSubscription({ variant = "inline", className = "" }: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Thank you for subscribing to our newsletter!")
    setEmail("")
    setIsSubmitting(false)
  }

  if (variant === "card") {
    return (
      <motion.div
        className={`bg-primary/5 rounded-xl p-8 shadow-lg ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-3 text-primary">Subscribe to our Newsletter</h3>
          <p className="text-muted-foreground mb-6 text-lg">Stay updated with our latest products, offers, and news.</p>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background text-lg rounded-lg py-3 px-4 w-full shadow-sm border border-muted-foreground focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" className="w-full py-3 px-4 text-lg bg-primary text-white rounded-lg transition-all duration-300 hover:bg-primary-dark disabled:bg-muted" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Subscribing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Subscribe</span>
                <Send className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>
      </motion.div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="max-w-xs p-3 text-lg border border-muted-foreground rounded-lg focus:ring-2 focus:ring-primary"
        />
        <Button type="submit" disabled={isSubmitting} className="p-3 text-lg bg-primary text-white rounded-lg transition-all duration-300 hover:bg-primary-dark disabled:bg-muted">
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span className="sr-only">Subscribe</span>
        </Button>
      </form>
    </div>
  )
}
