"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface LayoutAnimationsProps {
  children: ReactNode
}

export function PageTransition({ children }: LayoutAnimationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ 
  children, 
  delay = 0,
  duration = 0.5,
  direction = "up"
}: { 
  children: ReactNode, 
  delay?: number,
  duration?: number,
  direction?: "up" | "down" | "left" | "right" | "none"
}) {
  const directionVariants = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {}
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionVariants[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChildren({ 
  children, 
  staggerDelay = 0.1,
  containerDelay = 0
}: { 
  children: ReactNode, 
  staggerDelay?: number,
  containerDelay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, delay: containerDelay }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function StaggerItem({ 
  children,
  direction = "up"
}: { 
  children: ReactNode,
  direction?: "up" | "down" | "left" | "right" | "none"
}) {
  const directionVariants = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {}
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directionVariants[direction] },
        show: { 
          opacity: 1, 
          y: 0, 
          x: 0,
          transition: { duration: 0.5 }
        }
      }}
    >
      {children}
    </motion.div>
  )
}
