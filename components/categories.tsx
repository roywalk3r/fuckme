"use client"

import { useApi } from "@/lib/hooks/use-api"
import Link from "next/link"
import CategoryCard from "./category-card"
import { ArrowRight } from "lucide-react"

export default function Categories() {
  const { data: categories, isLoading, refetch } = useApi<any>("/api/categories")


  return (
    <section className="container max-w-full md:p-4">
      <div className="flex justify-center flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <p className="text-center">Loading categories...</p>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No categories found.</p>
        )}
      </div>
    </section>
  )
}
