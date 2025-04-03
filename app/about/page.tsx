import Image from "next/image"
import { PageTransition, FadeIn, StaggerChildren, StaggerItem } from "@/components/layout-animations"
import NewsletterSubscription from "@/components/newsletter"

export const metadata = {
  title: "About Us | TESE Store",
  description: "Learn about our mission, values, and the team behind TESE Store",
}

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-16 pb-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=800&width=1920"
              alt="About us hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="container relative z-10 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Our Story
              </h1>
              <p className="text-lg md:text-xl text-white/90 mt-4">
                Discover the passion and vision behind TESE Store
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Our mission"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  At TESE Store, our mission is to provide exceptional products that enhance your lifestyle while maintaining a commitment to quality, sustainability, and customer satisfaction.
                </p>
                <p className="text-muted-foreground">
                  We believe that everyone deserves access to premium products without compromise. That's why we carefully curate our collection to ensure that every item meets our high standards.
                </p>
                <p className="text-muted-foreground">
                  Our team is dedicated to creating a seamless shopping experience, from browsing our catalog to receiving your order at your doorstep.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted py-16">
          <div className="container">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            </FadeIn>
            
            <StaggerChildren>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StaggerItem>
                  <div className="bg-background rounded-lg p-6 h-full">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Quality</h3>
                    <p className="text-muted-foreground">
                      We never compromise on quality. Each product in our collection is carefully selected to ensure it meets our high standards.
                    </p>
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <div className="bg-background rounded-lg p-6 h-full">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                    <p className="text-muted-foreground">
                      We are committed to reducing our environmental impact by partnering with eco-conscious brands and implementing sustainable practices.
                    </p>
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <div className="bg-background rounded-lg p-6 h-full">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Community</h3>
                    <p className="text-muted-foreground">
                      We believe in building a community of like-minded individuals who share our passion for quality products and exceptional experiences.
                    </p>
                  </div>
                </StaggerItem>
              </div>
            </StaggerChildren>
          </div>
        </section>

        {/* Team Section */}
        <section className="container">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          </FadeIn>
          
          <StaggerChildren>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Jane Doe", role: "Founder & CEO", image: "/placeholder.svg?height=400&width=400" },
                { name: "John Smith", role: "Creative Director", image: "/placeholder.svg?height=400&width=400" },
                { name: "Emily Johnson", role: "Head of Product", image: "/placeholder.svg?height=400&width=400" },
                { name: "Michael Brown", role: "Customer Experience", image: "/placeholder.svg?height=400&width=400" }
              ].map((member, index) => (
                <StaggerItem key={index}>
                  <div className="text-center">
                    <div className="relative aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </section>

        {/* History Section */}
        <section className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our History</h2>
                <p className="text-muted-foreground">
                  TESE Store was founded in 2020 with a simple idea: to create a curated shopping experience that connects people with exceptional products.
                </p>
                <p className="text-muted-foreground">
                  What started as a small online boutique has grown into a thriving e-commerce platform, serving customers worldwide with a diverse range of premium products.
                </p>
                <p className="text-muted-foreground">
                  Throughout our journey, we've remained committed to our core values of quality, sustainability, and community, which continue to guide our decisions and shape our future.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2}>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Our history"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSubscription />
      </div>
    </PageTransition>
  )
}
