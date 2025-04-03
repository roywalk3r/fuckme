"use client";
import { useApi } from "./hooks/use-api"

export async function fetchFeaturedProducts() {
    const { data:response, isLoading, refetch } = useApi<any>("/api/products?featured=true")
    if (!response.ok) {
      throw new Error("Failed to fetch featured products")
    }
  
    if (!Array.isArray(response)) {
      throw new Error("Featured products data is not an array")
    }
  
    return response
   
  }
  
  export async function fetchCategories() {
    const { data:response, isLoading, refetch } = useApi<any>("/api/categories")
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
  
    if (!Array.isArray(response)) {
      throw new Error("Categories data is not an array")
    }
  
    return response

  }
  
  export async function fetchProducts(options = {}) {
    
  }
  
  export async function fetchProductById(id: string) {
    // In a real app, this would be an API call
    const products = await fetchProducts()
    return products.find((product) => product.id === id) || null
  }
  
  export async function fetchCategoryBySlug(slug: string) {
    // In a real app, this would be an API call
    const categories = await fetchCategories()
    return categories.find((category: { slug: string }) => category.slug === slug) || null
  }
  
  export async function fetchProductsByCategory(categoryId: string) {
    // In a real app, this would be an API call
    const products = await fetchProducts()
    return products.filter((product) => product.category_id === categoryId)
  }
  
  