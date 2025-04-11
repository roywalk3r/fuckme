"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, ShoppingCart, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AppwriteGallery } from "@/components/appwrite/appwrite-gallery"
import type { Product } from "@/types/product"
import { AppwriteImage } from "@/components/appwrite/appwrite-image"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        const data = await response.json()
        setProduct(data.data)

        // Fetch related products
        const relatedResponse = await fetch(
          `/api/products?category=${data.data.categoryId}&limit=4&exclude=${data.data.id}`,
        )
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedProducts(relatedData.data || [])
        }
      } catch (error) {
        toast.error("Failed to load product")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleAddToCart = async () => {
    if (!product) return

    setIsAddingToCart(true)
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add to cart")
      }

      toast.success(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart`)
    } catch (error) {
      toast.error("Failed to add product to cart")
      console.error(error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-10">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Product not found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/products")}>
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <AppwriteGallery images={product.images} productName={""} />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4" fill={star <= 4 ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>

              <Badge variant={product.stock > 0 ? "outline" : "destructive"} className="ml-2">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={product.stock <= quantity}>
                +
              </Button>
              <span className="ml-4 text-sm text-muted-foreground">{product.stock} available</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stock <= 0}
              className="flex-1"
              size="lg"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding to Cart...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>

            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex border-b pb-2">
                <span className="w-1/2 font-medium">Category</span>
                <span className="w-1/2">Electronics</span>
              </div>
              <div className="flex border-b pb-2">
                <span className="w-1/2 font-medium">Brand</span>
                <span className="w-1/2">Premium Brand</span>
              </div>
              <div className="flex border-b pb-2">
                <span className="w-1/2 font-medium">Warranty</span>
                <span className="w-1/2">1 Year</span>
              </div>
              <div className="flex border-b pb-2">
                <span className="w-1/2 font-medium">Weight</span>
                <span className="w-1/2">0.5 kg</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">March 15, 2023</div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4" fill={star <= 5 ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <p className="mt-2">Great product! Exactly as described and arrived quickly.</p>
              </div>

              <div className="border-b pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">February 28, 2023</div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4" fill={star <= 4 ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <p className="mt-2">Good quality but shipping took longer than expected.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/products/${relatedProduct.id}`)}
              >
                <div className="aspect-square overflow-hidden">
                  <AppwriteImage
                    src={relatedProduct.images[0] || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                    <Badge variant="outline" className="text-xs">
                      {relatedProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

