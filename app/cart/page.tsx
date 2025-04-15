"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AppwriteImage } from "@/components/appwrite/appwrite-image"
import type { CartItem } from "@/types/product"

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/cart")
        if (!response.ok) {
          throw new Error("Failed to fetch cart")
        }
        const data = await response.json()
        setCartItems(data.data.items || [])
      } catch (error) {
        toast.error("Failed to load cart")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCart()
  }, [])

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      })

      if (!response.ok) {
        throw new Error("Failed to update cart")
      }

      const data = await response.json()
      setCartItems(data.data.items || [])
      toast.success("Cart updated")
    } catch (error) {
      toast.error("Failed to update cart")
      console.error(error)
    } finally {
      setIsUpdating(false)
    }
  }

  const removeItem = async (itemId: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item")
      }

      const data = await response.json()
      setCartItems(data.data.items || [])
      toast.success("Item removed from cart")
    } catch (error) {
      toast.error("Failed to remove item")
      console.error(error)
    } finally {
      setIsUpdating(false)
    }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity
    }, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.1 // 10% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-10">
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2">Looks like you haven't added any products to your cart yet.</p>
          <Button className="mt-4" onClick={() => router.push("/products")}>
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex border rounded-lg p-4">
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                <AppwriteImage
                  src={item.product?.images[0] || "/placeholder.svg"}
                  alt={item.product?.name || "Product"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.product?.name}</h3>
                  <p className="font-medium">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                </div>

                <p className="text-sm text-muted-foreground mt-1">${(item.product?.price || 0).toFixed(2)} each</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={isUpdating || item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                      className="w-12 h-8 mx-2 text-center"
                      disabled={isUpdating}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={isUpdating}
                    >
                      +
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} disabled={isUpdating}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg" onClick={() => router.push("/checkout")}>
              Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Secure checkout powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
