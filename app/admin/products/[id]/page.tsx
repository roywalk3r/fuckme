"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Save, X, Edit2, ImageIcon } from "lucide-react"
import { useApiMutation, useApi } from "@/lib/hooks/use-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { CloudinaryUploadWidget } from "@/components/cloudinary-upload-widget"
import { CloudinaryMediaLibrary } from "@/components/cloudinary-media-library"
import { CloudinaryImagePreview } from "@/components/cloudinary-image-preview"

// Product validation schema
const productSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
  category_id: z.string().min(1, "Category is required"),
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null)

  // Fetch product data
  const {
    data: productData,
    isLoading: isLoadingProduct,
    error: productError,
  } = useApi<any>(`/api/admin/products/${params.id}`)

  // Fetch categories
  const { data: categoriesData, isLoading: isLoadingCategories } = useApi<any>("/api/categories")
  const categories = categoriesData?.data || []

  // Update product mutation
  const { mutate: updateProduct, isLoading: isUpdating } = useApiMutation("/api/admin/products", "PATCH", {
    onSuccess: () => {
      toast.info("Product updated", {
        description: "The product has been updated successfully.",
      })
      router.push("/admin/products")
    },
    onError: (error) => {
      toast.error("Error", {
        description: error,
      })
    },
  })

  // Form setup
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: params.id,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category_id: "",
      images: [],
    },
  })

  // Update form when product data is loaded
  useEffect(() => {
    if (productData?.data) {
      const product = productData.data
      form.reset({
        id: params.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        images: product.images,
      })
      setImageUrls(product.images)
    }
  }, [productData, form, params.id])

  // Handle image upload success
  const handleUploadSuccess = (results: any[]) => {
    const newUrls = results.map((result) => result.secure_url)
    const updatedImages = [...imageUrls, ...newUrls]
    setImageUrls(updatedImages)
    form.setValue("images", updatedImages)

    toast.info("Images uploaded", {
      description: `${results.length} image(s) uploaded successfully.`,
    })
  }

  // Handle media library selection
  const handleMediaSelection = (selectedUrls: string[]) => {
    const updatedImages = [...imageUrls, ...selectedUrls]
    setImageUrls(updatedImages)
    form.setValue("images", updatedImages)
  }

  // Remove image from the list
  const handleRemoveImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index)
    setImageUrls(updatedImages)
    form.setValue("images", updatedImages)
  }

  // Handle image transformation
  const handleImageTransform = (newUrl: string) => {
    if (editingImageIndex !== null) {
      const updatedImages = [...imageUrls]
      updatedImages[editingImageIndex] = newUrl
      setImageUrls(updatedImages)
      form.setValue("images", updatedImages)
    }
    setEditingImageIndex(null)
  }

  // Form submission
  const onSubmit = (data: ProductFormValues) => {
    updateProduct(data)
  }

  if (productError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load product data. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
      </div>

      {isLoadingProduct ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-60 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Edit the details of your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter product description" className="min-h-32" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoadingCategories ? (
                              <SelectItem value="loading" disabled>
                                Loading categories...
                              </SelectItem>
                            ) : categories.length === 0 ? (
                              <SelectItem value="none" disabled>
                                No categories found
                              </SelectItem>
                            ) : (
                              categories.map((category: any) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Edit images for your product using Cloudinary.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormDescription>
                          Upload or select images from your media library. You can also edit images after uploading.
                        </FormDescription>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              <CloudinaryUploadWidget
                                onUploadSuccess={handleUploadSuccess}
                                buttonText="Upload Images"
                                options={{
                                  folder: "products",
                                  resourceType: "image",
                                  multiple: true,
                                  maxFiles: 10,
                                  clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
                                  maxFileSize: 10000000, // 10MB
                                }}
                              />

                              <CloudinaryMediaLibrary
                                onSelect={handleMediaSelection}
                                buttonText="Media Library"
                                maxSelections={10}
                                selectedImages={imageUrls}
                              />
                            </div>

                            {imageUrls.length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {imageUrls.map((url, index) => (
                                  <div key={index} className="relative group">
                                    <div className="aspect-square overflow-hidden rounded-md border">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={url || "/placeholder.svg"}
                                        alt={`Product image ${index + 1}`}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div className="absolute top-2 right-2 flex gap-1">
                                      <Button
                                        type="button"
                                        variant="secondary"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => setEditingImageIndex(index)}
                                      >
                                        <Edit2 className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleRemoveImage(index)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="border rounded-md p-8 text-center text-muted-foreground">
                                <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                                <p>No images added yet</p>
                                <p className="text-sm">Upload or select images from the media library</p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* Image Editor */}
      {editingImageIndex !== null && (
        <CloudinaryImagePreview
          imageUrl={imageUrls[editingImageIndex]}
          onClose={() => setEditingImageIndex(null)}
          onTransform={handleImageTransform}
        />
      )}
    </div>
  )
}

