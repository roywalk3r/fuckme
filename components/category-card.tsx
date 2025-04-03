"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Category = {
  id: string
  name: string
  slug: string
  image: string
}

export default function CategoryCard({ category }: { category: Category }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative rounded-lg overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/categories/${category.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.image || "/placeholder.svg?height=300&width=300"}
            alt={category.name}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
          />
          <motion.div
            className="absolute inset-0 bg-black/40"
            animate={{
              backgroundColor: isHovered ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.4)",
            }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white text-xl font-semibold text-center px-4">{category.name}</h3>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

