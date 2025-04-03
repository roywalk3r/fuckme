"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import NewsletterSubscription from "./newsletter"

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasClosedPopup, setHasClosedPopup] = useState(false)

  useEffect(() => {
    // Check if user has already closed the popup in this session
    const hasClosedBefore = sessionStorage.getItem("newsletter_popup_closed")

    if (!hasClosedBefore) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setHasClosedPopup(true)
    sessionStorage.setItem("newsletter_popup_closed", "true")
  }

  return (
    <AnimatePresence>
      {isOpen && !hasClosedPopup && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative bg-background rounded-lg shadow-lg max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={handleClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">Join Our Newsletter</h3>
              <p className="text-muted-foreground">
                Subscribe to get exclusive offers, new product announcements, and more!
              </p>
            </div>

            <NewsletterSubscription variant="card" className="border-none p-0 bg-transparent" />

            <div className="text-center mt-4 text-xs text-muted-foreground">
              <p>By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

