"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingProducts } from "@/components/trending-products"
import { FeaturedCategories } from "@/components/featured-categories"
import { ProductShowcase } from "@/components/product-showcase"
import { NewsletterSection } from "@/components/newsletter-section"
import { HeroCarousel } from "@/components/hero-carousel"
import { PageLoading } from "@/components/ui/page-loading"

export default function Home() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section with Carousel */}
            <HeroCarousel />

            {/* Featured Categories */}
            <section className="container px-4 md:px-6">
                <div className="flex flex-col gap-2 mb-8">
                    <motion.h2
                        className="text-3xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Shop by Category
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Browse our wide selection of products by category
                    </motion.p>
                </div>

                <Suspense fallback={<PageLoading />}>
                    <FeaturedCategories />
                </Suspense>
            </section>

            {/* Featured Products */}
            <section className="container px-4 md:px-6">
                <div className="flex flex-col gap-2 mb-8">
                    <motion.h2
                        className="text-3xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Featured Products
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Discover our most popular items loved by customers worldwide
                    </motion.p>
                </div>

                <Suspense fallback={<PageLoading />}>
                    <ProductShowcase />
                </Suspense>

                <div className="flex justify-center mt-8">
                    <Button asChild>
                        <Link href="/products">
                            View All Products
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Trending Products Section */}
            <section className="bg-muted/50 py-16">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col gap-2 mb-8">
                        <motion.h2
                            className="text-3xl font-bold tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Trending Now
                        </motion.h2>
                        <motion.p
                            className="text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            See what&#39;s popular with our customers right now
                        </motion.p>
                    </div>

                    <Suspense fallback={<PageLoading />}>
                        <TrendingProducts />
                    </Suspense>
                </div>
            </section>

            {/* Newsletter Section */}
            <NewsletterSection />
        </div>
    )
}
