import prisma from "@/lib/prisma"
import { createApiResponse, handleApiError } from "@/lib/api-utils"
import {NextRequest, NextResponse} from "next/server"
import { z } from "zod"
import { auth } from "@clerk/nextjs/server"
import {deleteCache, getCache, setCache} from "@/lib/redis";

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
    const cacheKey = "categories"
    const cachedCategories = await getCache(cacheKey)
    if (cachedCategories) {
      return NextResponse.json({ data: cachedCategories, cached: true })
    }
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
              take: 4,
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
    await setCache(cacheKey, categories, 300)

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
    const { userId } = await auth()
    // Check if user is authenticated and is an admin
    if (!userId) {
      return createApiResponse({
        error: "Unauthorized",
        status: 401,
      })
    }

    // Parse and validate request body
    const body = await req.json()
    const validatedData = categorySchema.parse(body)
    const cacheKey = "categories";

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
    await deleteCache(cacheKey)

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
    const { userId } = await auth()

    // Check if user is authenticated
    if (!userId) {
      return createApiResponse({
        error: "Unauthorized",
        status: 401,
      })
    }

    // Parse and validate request body
    const body = await req.json()
    const { id, ...validatedData } = categorySchema.parse(body)
    const cacheKey = "categories";
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

    // Check if slug or name conflicts with another category
    const conflictingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: validatedData.name }, { slug: validatedData.slug }],
        NOT: { id },
      },
    })

    if (conflictingCategory) {
      return createApiResponse({
        error: "A different category with this name or slug already exists",
        status: 409,
      })
    }

    // Update category
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: validatedData,
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })
  await deleteCache(cacheKey);
    return createApiResponse({
      data: updatedCategory,
      status: 200,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth()

    // Check if user is authenticated
    if (!userId) {
      return createApiResponse({
        error: "Unauthorized",
        status: 401,
      })
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
        status: 409,
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
