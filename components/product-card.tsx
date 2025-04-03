"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

type Product = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: {
    name: string
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || "/placeholder.svg?height=300&width=300",
    })
  }

  return (
    <motion.div
      className="group relative rounded-lg overflow-hidden border bg-background"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
          />
          <motion.div
            className="absolute inset-0 bg-black/0"
            animate={{
              backgroundColor: isHovered ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0)",
            }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute top-2 right-2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90 hover:text-black"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Add to wishlist functionality would go here
              }}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ y: "100%" }}
            animate={{ y: isHovered ? 0 : "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Button className="w-full rounded-full" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        <div className="p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="text-xs text-muted-foreground mb-1">{product.category.name}</div>
            <h3 className="font-medium line-clamp-1">{product.name}</h3>
            <p className="font-semibold mt-1">${product.price.toFixed(2)}</p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

