import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
export default function Hero() {
  return (
    <section className="relative p-4 justify-center h-[70vh] flex items-center">
    <div className="absolute inset-0 z-0">
      <Image
        src="/ero.jpg?height=1080&width=1920"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
    <div className="container relative z-10 text-white">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Discover Exceptional Quality</h1>
        <p className="text-lg md:text-xl text-white/90">
          Explore our curated collection of premium products designed to elevate your lifestyle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full bg-transparent text-white border-white hover:bg-white hover:text-black"
          >
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
  )
}

