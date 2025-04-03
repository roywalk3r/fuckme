import { Suspense } from "react"
import { fetchProducts, fetchCategories } from "@/lib/data"
import ProductsGrid from "@/components/products-grid"
import ProductsFilter from "@/components/products-filter"
import ProductsSkeleton from "@/components/products-skeleton"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  
  const products = await fetchProducts()
  const categories = await fetchCategories()

  console.log(categories);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <ProductsFilter categories={categories} />

        <div>
          <Suspense fallback={<ProductsSkeleton />}>
            <ProductsGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

