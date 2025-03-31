import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { createApiResponse, handleApiError } from "@/lib/api-utils"
import { adminAuthMiddleware } from "@/lib/admin-auth"

export async function GET(req: NextRequest) {
  // Check admin authorization
  const authResponse = await adminAuthMiddleware(req)
  if (authResponse.status !== 200) {
    return authResponse
  }

  try {
    // Fetch statistics
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenueData,
      recentOrders,
      topProductsData,
      usersByRole,
      salesByMonth,
    ] = await Promise.all([
      prisma.users.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          total_amount: true,
        },
        where: { payment_status: "paid" },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { created_at: "desc" },
        include: {
          user: { select: { name: true, email: true } },
        },
      }),

      // Top selling products
      prisma.order_item.groupBy({
        by: ["product_id"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),

      // Users by role
      prisma.users.groupBy({
        by: ["role"],
        _count: true,
      }),

      // Sales by month (last 6 months)
      prisma.$queryRaw`
        SELECT 
          DATE_TRUNC('month', "created_at") as month,
          SUM("total_amount") as revenue,
          COUNT(*) as orders
        FROM "order"
        WHERE "created_at" > NOW() - INTERVAL '6 months'
        GROUP BY DATE_TRUNC('month', "created_at")
        ORDER BY month DESC
      `,
    ])

    // Fetch product details for top products
    const productIds = topProductsData.map((item: any) => item.product_id)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    // Map product details to topProducts
    const topProducts = topProductsData.map((item: any) => ({
      product: products.find((p) => p.id === item.product_id),
      totalSold: item._sum.quantity,
    }))

    return createApiResponse({
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenueData._sum.total_amount || 0,
        recentOrders,
        topProducts,
        usersByRole,
        salesByMonth,
      },
      status: 200,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
