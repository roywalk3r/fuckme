import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import NewsletterSubscription from "./newsletter"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TESE</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Discover our curated collection of premium products designed to elevate your lifestyle.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-sm font-semibold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">Stay updated with our latest products and offers.</p>
              <NewsletterSubscription variant="inline" />
            </div>
            <div className="text-sm text-muted-foreground md:text-right">
              <p>&copy; {new Date().getFullYear()} TESE Store. All rights reserved.</p>
              <p className="mt-1">Designed and developed with ❤️ for our customers.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

