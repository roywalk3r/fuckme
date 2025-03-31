import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { createApiResponse, handleApiError } from "@/lib/api-utils"
import { adminAuthMiddleware } from "@/lib/admin-auth"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // Check admin authorization
  const authResponse = await adminAuthMiddleware(req)
  if (authResponse.status !== 200) {
    return authResponse
  }

  try {
    const productId = params.id
    console.log(`Fetching product with ID: ${productId}`)

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
      },
    })

    console.log(`Product found:`, product)

    if (!product) {
      console.log(`Product not found with ID: ${productId}`)
      return createApiResponse({
        error: "Product not found",
        status: 404,
      })
    }

    return createApiResponse({
      data: product,
      status: 200,
    })
  } catch (error) {
    console.error(`Error fetching product with ID ${params.id}:`, error)
    return handleApiError(error)
  }
}
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  // Check admin authorization
  const authResponse = await adminAuthMiddleware(req)
  if (authResponse.status !== 200) {
    return authResponse
  }

  try {
    const productId = params.id
    const body = await req.json()

    console.log(`Updating product with ID: ${productId}`)
    console.log("Update data:", body)

    // Fetch the existing product
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      select: { category_id: true }, // Get current category_id
    })

    if (!existingProduct) {
      return createApiResponse({
        error: "Product not found",
        status: 404,
      })
    }

    // Update product while preserving the existing category_id if none is provided
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        category_id: body.category_id || existingProduct.category_id, // Keep existing category if not changed
        images: body.images,
      },
    })

    console.log(`Product updated successfully:`, updatedProduct)

    return createApiResponse({
      data: updatedProduct,
      status: 200,
    })
  } catch (error) {
    console.error(`Error updating product with ID ${params.id}:`, error)
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Check admin authorization
  const authResponse = await adminAuthMiddleware(req)
  if (authResponse.status !== 200) {
    return authResponse
  }

  try {
    const productId = params.id

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!existingProduct) {
      return createApiResponse({
        error: "Product not found",
        status: 404,
      })
    }

    // Delete product
    await prisma.product.delete({
      where: { id: productId },
    })

    return createApiResponse({
      data: { message: "Product deleted successfully" },
      status: 200,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

