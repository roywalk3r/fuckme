"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type Category = {
  id: string
  name: string
  slug: string
}

export default function ProductsFilter({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const applyFilters = () => {
    // In a real app, this would update the URL and trigger a new fetch
    // For now, we'll just close the mobile filters
    setMobileFiltersOpen(false)
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[0, 1000]} max={1000} step={10} value={priceRange} onValueChange={handlePriceChange} />
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <Label htmlFor="in-stock">In Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="out-of-stock" />
                <Label htmlFor="out-of-stock">Out of Stock</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings">
          <AccordionTrigger>Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-5" />
                <Label htmlFor="rating-5">5 Stars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-4" />
                <Label htmlFor="rating-4">4 Stars & Up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-3" />
                <Label htmlFor="rating-3">3 Stars & Up</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <motion.div
        className="hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FilterContent />
      </motion.div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

