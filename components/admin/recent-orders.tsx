"use client"

import { useEffect, useState } from "react"
import { useApi } from "@/lib/hooks/use-api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Package, CreditCard, Eye } from "lucide-react"

export default function AdminRecentOrders() {
  const { data, isLoading } = useApi<any>("/api/admin/dashboard")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return <OrdersLoading />
  }

  const recentOrders = data?.recentOrders || []
console.log("🚀 ~ AdminRecentOrders ~ recentOrders:", recentOrders)
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "processing":
        return "secondary"
      case "shiped":
        return "success"
      case "delivered":
        return "success"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success"  // Now "success" is a valid variant
      case "pending":
        return "outline"
      case "failed":
        return "destructive"
      case "refunded":
        return "secondary"
      default:
        return "outline"
    }
  }
  
  

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No recent orders
              </TableCell>
            </TableRow>
          ) : (
            recentOrders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                <TableCell>{order.user?.name || order.user?.email || "N/A"}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    <Package className="h-3 w-3 mr-1" />
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPaymentStatusBadgeVariant(order.payment_status)}>
                    <CreditCard className="h-3 w-3 mr-1" />
                    {order.payment_status}
                  </Badge>
                </TableCell>
                <TableCell>${Number(order.total_amount)?.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )


function OrdersLoading() {
  return (
    <div className="space-y-2">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
    </div>
  )
}}