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

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
      },
    })

    if (!product) {
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

