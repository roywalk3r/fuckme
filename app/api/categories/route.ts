import prisma from "@/lib/prisma"
import { createApiResponse, handleApiError } from "@/lib/api-utils"
import type { NextRequest } from "next/server"
import { z } from "zod"
import { adminAuthMiddleware } from "@/lib/admin-auth"

// Category validation schema
const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  image: z.string().url("Invalid image URL").optional(),
})

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const withProducts = url.searchParams.get("withProducts") === "true"

    const categories = await prisma.category.findMany({
      include: {
        products: withProducts
          ? {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
              },
              take: 4, // Limit to 4 products per category for preview
            }
          : false,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: { name: "asc" },
    })

    return createApiResponse({
      data: categories,
      status: 200,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check admin authorization
    const authResponse = await adminAuthMiddleware(req)
    if (authResponse.status !== 200) {
      return authResponse
    }

    // Parse and validate request body
    const body = await req.json()
    const validatedData = categorySchema.parse(body)

    // Check if category with same name or slug already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: validatedData.name }, { slug: validatedData.slug }],
      },
    })

    if (existingCategory) {
      return createApiResponse({
        error: "A category with this name or slug already exists",
        status: 409,
      })
    }

    // Create category
    const category = await prisma.category.create({
      data: validatedData,
    })

    return createApiResponse({
      data: category,
      status: 201,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Check admin authorization
    const authResponse = await adminAuthMiddleware(req)
    if (authResponse.status !== 200) {
      return authResponse
    }

    // Parse and validate request body
    const body = await req.json()
    const { id, ...validatedData } = categorySchema.parse(body)

    if (!id) {
      return createApiResponse({
        error: "Category ID is required",
        status: 400,
      })
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    })

    if (!existingCategory) {
      return createApiResponse({
        error: "Category not found",
        status: 404,
      })
    }

    // Check if another category with the same name or slug exists
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: validatedData.name }, { slug: validatedData.slug }],
        NOT: { id },
      },
    })

    if (duplicateCategory) {
      return createApiResponse({
        error: "Another category with this name or slug already exists",
        status: 409,
      })
    }

    // Update category
    const category = await prisma.category.update({
      where: { id },
      data: validatedData,
    })

    return createApiResponse({
      data: category,
      status: 200,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Check admin authorization
    const authResponse = await adminAuthMiddleware(req)
    if (authResponse.status !== 200) {
      return authResponse
    }

    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return createApiResponse({
        error: "Category ID is required",
        status: 400,
      })
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })

    if (!existingCategory) {
      return createApiResponse({
        error: "Category not found",
        status: 404,
      })
    }

    // Check if category has products
    if (existingCategory._count.products > 0) {
      return createApiResponse({
        error: "Cannot delete category with associated products",
        status: 400,
      })
    }

    // Delete category
    await prisma.category.delete({
      where: { id },
    })

    return createApiResponse({
      data: { message: "Category deleted successfully" },
      status: 200,
    })
  } catch (error) {
    return handleApiError(error)
  }
}


