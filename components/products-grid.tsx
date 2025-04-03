"use client"

import { motion } from "framer-motion"
import ProductCard from "@/components/product-card"

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

export default function ProductsGrid({ products }: { products: Product[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}

