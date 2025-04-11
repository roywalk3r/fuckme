import prisma from "@/lib/prisma"
import { createApiResponse, handleApiError } from "@/lib/api-utils"
import type { NextRequest } from "next/server"
import { z } from "zod"
import { auth } from "@clerk/nextjs/server"

// Category validation schema
const categorySchema = z.object({
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

