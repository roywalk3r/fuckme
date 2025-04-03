import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import CategoryCard from "@/components/category-card"
import NewsletterSubscription from "@/components/newsletter"
import { fetchFeaturedProducts, fetchCategories } from "@/lib/data"
import Categories from "@/components/categories"
import Hero from "@/components/hero"

export default async function Home() {
  const featuredProducts = await fetchFeaturedProducts()

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
   <Hero/>


      <Categories/>

      {/* Featured Products Section */}
      <section className="container max-w-full md:p-4">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product:any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="container max-w-full md:p-4">
        <NewsletterSubscription variant="card" />
      </section> */}

      {/* Promotion Banner */}
      <section className="container max-w-full md:p-4">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/ex.jpg?height=600&width=1200"
              alt="Promotion background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center text-white py-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Collection 2025</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Discover our new summer collection and get ready for the season with our exclusive products.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/products?collection=summer">Shop Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container max-w-full md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground">Free shipping on all orders over $50</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-muted-foreground">30-day return policy for all products</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-muted-foreground">All transactions are secure and encrypted</p>
          </div>
        </div>
      </section>
    </div>
  )
}

