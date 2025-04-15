import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"

export default function ProductsPage() {
  // This would typically come from your backend
  const products = [
    {
      id: 1,
      name: "Premium Package",
      description: "Our most popular comprehensive solution for businesses of all sizes.",
      price: "$99.99",
      category: "software",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
    {
      id: 2,
      name: "Basic Package",
      description: "Perfect for small businesses and startups looking to get started.",
      price: "$49.99",
      category: "software",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      id: 3,
      name: "Enterprise Solution",
      description: "Customized solutions for large organizations with complex needs.",
      price: "$199.99",
      category: "software",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6", "Feature 7"],
    },
    {
      id: 4,
      name: "Hardware Bundle A",
      description: "Essential hardware components for optimal performance.",
      price: "$299.99",
      category: "hardware",
      features: ["Component 1", "Component 2", "Component 3", "1-Year Warranty"],
    },
    {
      id: 5,
      name: "Hardware Bundle B",
      description: "Advanced hardware setup with premium components.",
      price: "$499.99",
      category: "hardware",
      features: ["Component 1", "Component 2", "Component 3", "Component 4", "3-Year Warranty"],
    },
    {
      id: 6,
      name: "Support Plan",
      description: "24/7 priority support and maintenance for your systems.",
      price: "$29.99/month",
      category: "services",
      features: ["24/7 Support", "Priority Queue", "Monthly Check-ups", "Emergency Response"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Products</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Browse our selection of high-quality products designed to meet your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters */}
            <div className="w-full md:w-64 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Search</h3>
                <div className="relative">
                  <Input type="search" placeholder="Search products..." className="w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Categories</h3>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Price Range</h3>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-50">$0 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200+">$200+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <div className="flex-1">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="software">Software</TabsTrigger>
                  <TabsTrigger value="hardware">Hardware</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="software" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products
                      .filter((product) => product.category === "software")
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="hardware" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products
                      .filter((product) => product.category === "hardware")
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="services" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products
                      .filter((product) => product.category === "services")
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="aspect-video w-full bg-muted rounded-md mb-4 flex items-center justify-center">
          <img
            src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="rounded-md object-cover"
            width={300}
            height={200}
          />
        </div>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="font-medium">{product.price}</div>
          <ul className="space-y-1 text-sm">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
