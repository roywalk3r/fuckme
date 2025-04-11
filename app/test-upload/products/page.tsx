"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Search } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AppwriteImage } from "@/components/appwrite/appwrite-image"
import type { Product, Category } from "@/types/product"

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortOption, setSortOption] = useState("featured")
  const [isClient, setIsClient] = useState(false) // Fix for hydration

  useEffect(() => {
    setIsClient(true) // Ensures the component is only mounted on the client

    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")
    const sortParam = searchParams.get("sort")

    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","))
    }
    if (searchParam) {
      setSearchQuery(searchParam)
    }
    if (sortParam) {
      setSortOption(sortParam)
    }

    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const params = new URLSearchParams()
        if (categoryParam) params.append("category", categoryParam)
        if (searchParam) params.append("search", searchParam)
        if (sortParam) params.append("sort", sortParam)

        const response = await fetch(`/api/products?${params.toString()}`)
        if (!response.ok) throw new Error("Failed to fetch products")

        const data = await response.json()
        setProducts(data.data || [])

        // Fetch categories
        const categoriesResponse = await fetch("/api/categories")
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          setCategories(categoriesData.data || [])
        }
      } catch (error) {
        toast.error("Failed to load products")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleSortChange = (option: string) => {
    setSortOption(option)
    applyFilters({ sort: option })
  }

  const applyFilters = (additionalParams?: Record<string, string>) => {
    const params = new URLSearchParams()
    if (searchQuery) params.append("search", searchQuery)
    if (selectedCategories.length > 0) params.append("category", selectedCategories.join(","))
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      params.append("minPrice", priceRange[0].toString())
      params.append("maxPrice", priceRange[1].toString())
    }
    if (sortOption !== "featured") params.append("sort", sortOption)

    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => params.append(key, value))
    }

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setSortOption("featured")
    router.push("/products")
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-64">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or search term</p>
          <Button variant="outline" className="mt-4" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} onClick={() => router.push(`/products/${product.id}`)}>
              <AppwriteImage src={product.images[0] || "/placeholder.svg"} alt={product.name} />
              <CardContent>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </CardContent>
              <CardFooter>
                <span>${product.price.toFixed(2)}</span>
                <Badge variant={product.stock > 0 ? "outline" : "destructive"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

