"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartStore } from "@/lib/store/cart-store"
import { toast } from "sonner"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [removingItemId, setRemovingItemId] = useState<string | null>(null)
  // Fix hydration issues by ensuring component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate shipping, tax, and total
  const shipping = subtotal() > 100 ? 0 : 10
  const tax = (subtotal() - discount) * 0.07
  const total = subtotal() - discount + shipping + tax

  // Handle promo code application
  const applyPromoCode = () => {
    if (!promoCode) return

    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "welcome10") {
        const discountAmount = subtotal() * 0.1
        setDiscount(discountAmount)
        toast.success("Promo code applied!", {
          description: `You saved $${discountAmount.toFixed(2)} with this code.`,
        })
      } else {
        toast.error("Invalid promo code", {
          description: "Please enter a valid promo code.",
        })
      }
      setIsApplyingPromo(false)
    }, 800)
  }

  const handleRemoveItem = (id: string) => {
    setRemovingItemId(id)

    // Small delay for animation
    setTimeout(() => {
      removeItem(id)
      toast.success("Item Removed",{

        description: "Item has been removed from your cart.",
      })
      setRemovingItemId(null)
    }, 300)
  }

  // If not mounted yet, show a loading skeleton
  if (!mounted) {
    return (
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg border shadow-sm animate-pulse">
                <div className="p-6">
                  <div className="h-8 w-48 bg-muted rounded mb-6"></div>
                  <div className="space-y-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-4">
                          <div className="h-24 w-24 bg-muted rounded"></div>
                          <div className="flex-1">
                            <div className="h-6 w-48 bg-muted rounded mb-2"></div>
                            <div className="h-4 w-24 bg-muted rounded mb-4"></div>
                            <div className="h-8 w-32 bg-muted rounded"></div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="h-80 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
    )
  }

  return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Cart", href: "/cart", active: true },
            ]}
        />

        <motion.h1
            className="text-3xl font-bold my-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          Shopping Cart
        </motion.h1>

        {items.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items ({totalItems()})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <AnimatePresence>
                      {items.map((item) => (
                          <motion.div
                              key={item.id}
                              className="flex flex-col sm:flex-row gap-4"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                opacity: removingItemId === item.id ? 0 : 1,
                                height: removingItemId === item.id ? 0 : "auto",
                              }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                          >
                            <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-medium">{item.name}</h3>
                                  {(item.color || item.size) && (
                                      <p className="text-sm text-muted-foreground">
                                        {item.color && `${item.color}`}
                                        {item.color && item.size && ", "}
                                        {item.size && `${item.size}`}
                                      </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">${item.price.toFixed(2)}</div>
                                  <div className="text-sm text-muted-foreground">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center">
                                  <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 rounded-full"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                      aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 rounded-full"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      aria-label="Increase quantity"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleRemoveItem(item.id)}
                                    aria-label="Remove item"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                      ))}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal().toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="w-full">
                      <p className="text-sm mb-2">Have a promo code?</p>
                      <div className="flex gap-2">
                        <Input placeholder="Enter code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                        <Button variant="outline" onClick={applyPromoCode} disabled={isApplyingPromo || !promoCode}>
                          {isApplyingPromo ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
        ) : (
            <motion.div
                className="flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
              <div className="rounded-full bg-muted p-6 mb-4">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </motion.div>
        )}
      </div>
  )
}
