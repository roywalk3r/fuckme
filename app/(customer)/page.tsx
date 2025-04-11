import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { getSettings } from "@/lib/settings"

export default async function HomePage() {
  const settings = await getSettings()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {settings?.general?.heroTitle || "Transform Your Experience"}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {settings?.general?.heroSubtitle ||
                    "Our platform provides everything you need to streamline your workflow and boost productivity."}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/products">Explore Products</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                alt="Hero Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/placeholder.svg?height=550&width=800"
                width="800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides a comprehensive set of features to help you succeed.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
            {[
              {
                title: "Intuitive Dashboard",
                description: "Get a clear overview of your performance with our easy-to-use dashboard.",
                icon: "layout-dashboard",
              },
              {
                title: "Real-time Analytics",
                description: "Track your progress with real-time analytics and insights.",
                icon: "bar-chart",
              },
              {
                title: "Secure Platform",
                description: "Your data is protected with enterprise-grade security measures.",
                icon: "shield",
              },
              {
                title: "Customizable Workflows",
                description: "Create custom workflows that match your unique business processes.",
                icon: "settings",
              },
              {
                title: "Seamless Integration",
                description: "Connect with your favorite tools and services without any hassle.",
                icon: "plug",
              },
              {
                title: "24/7 Support",
                description: "Our dedicated support team is always ready to help you succeed.",
                icon: "headphones",
              },
            ].map((feature, index) => (
              <Card key={index} className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {feature.icon === "layout-dashboard" && (
                        <>
                          <rect width="7" height="9" x="3" y="3" rx="1" />
                          <rect width="7" height="5" x="14" y="3" rx="1" />
                          <rect width="7" height="9" x="14" y="12" rx="1" />
                          <rect width="7" height="5" x="3" y="16" rx="1" />
                        </>
                      )}
                      {feature.icon === "bar-chart" && (
                        <>
                          <line x1="12" x2="12" y1="20" y2="10" />
                          <line x1="18" x2="18" y1="20" y2="4" />
                          <line x1="6" x2="6" y1="20" y2="16" />
                        </>
                      )}
                      {feature.icon === "shield" && (
                        <>
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        </>
                      )}
                      {feature.icon === "settings" && (
                        <>
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                      {feature.icon === "plug" && (
                        <>
                          <path d="M12 22v-5" />
                          <path d="M9 7V2" />
                          <path d="M15 7V2" />
                          <path d="M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4Z" />
                        </>
                      )}
                      {feature.icon === "headphones" && (
                        <>
                          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </>
                      )}
                    </svg>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="mt-2">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our customers have to say about us.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mt-8">
            {[
              {
                quote:
                  "This platform has completely transformed how we operate. The intuitive interface and powerful features have saved us countless hours.",
                author: "Sarah Johnson",
                role: "CEO, TechStart Inc.",
              },
              {
                quote:
                  "The customer support team is exceptional. They've been responsive and helpful every step of the way, making our transition seamless.",
                author: "Michael Chen",
                role: "CTO, Innovate Solutions",
              },
              {
                quote:
                  "We've seen a 40% increase in productivity since implementing this platform. It's been a game-changer for our team.",
                author: "Emily Rodriguez",
                role: "Operations Manager, Global Enterprises",
              },
              {
                quote:
                  "The analytics features provide invaluable insights that have helped us make data-driven decisions and grow our business.",
                author: "David Kim",
                role: "Marketing Director, Growth Ventures",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of satisfied customers who have transformed their business with our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/products">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

