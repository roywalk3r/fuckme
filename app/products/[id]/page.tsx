import { Suspense } from "react"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { ProductDetail } from "@/components/product-detail"
import { ProductRecommendations } from "@/components/product-recommendations"
import { PageLoading } from "@/components/ui/page-loading"
import { Breadcrumb } from "@/components/ui/breadcrumb"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params

  // Fetch product data
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-8 space-y-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.category?.name || "Category", href: `/categories/${product.category?.slug}` },
          { label: product.name, href: `/products/${product.id}`, active: true },
        ]}
      />

      <ProductDetail product={product} />

      <Suspense fallback={<PageLoading />}>
        <ProductRecommendations productId={product.id} type="similar" title="You Might Also Like" />
      </Suspense>
    </div>
  )
}
