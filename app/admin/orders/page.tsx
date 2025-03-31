"use client"

import type React from "react"

import { useState } from "react"
import {
  Search, Filter, MoreHorizontal, Edit, Eye, ArrowUpDown, Package, CreditCard
} from "lucide-react"
import { useApi, useApiMutation } from "@/lib/hooks/use-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [editingOrder, setEditingOrder] = useState<any>(null)
  const [status, setStatus] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")

  // Fetch orders
  const { data, isLoading, refetch } = useApi<any>(`/api/admin/orders?page=${page}&search=${search}`)

  // Update order mutation
  const { mutate: updateOrder, isLoading: isUpdating } = useApiMutation(`/api/admin/orders`, "PATCH", {
    onSuccess: () => {
      toast.success("Order updated", {
        description: "The order status has been updated successfully.",
      })
      refetch()
      setEditingOrder(null)
    },
    onError: (error) => {
      toast.error("Error", { description: error })
    },
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    refetch()
  }

  const handleUpdateOrder = () => {
    if (editingOrder) {
      const updateData: any = { id: editingOrder.id, status, payment_status: paymentStatus }
      updateOrder(updateData)
    }
  }

  const getStatusBadgeVariant = (status: string) => ({
    PROCESSING: "secondary",
    SHIPPED: "default",
    DELIVERED: "success",
    CANCELLED: "destructive",
  }[status] || "outline")

  const getPaymentStatusBadgeVariant = (status: string) => ({
    PAID: "success",
    PENDING: "outline",
    FAILED: "destructive",
    REFUNDED: "secondary",
  }[status] || "outline")

  const orders = data?.orders || []
  const pagination = data?.pagination || { total: 0, pages: 1 }

  console.log("🚀 ~ Admin Orders Data:", data)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <div className="flex items-center justify-between">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input type="search" placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Order ID</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">No orders found</TableCell>
                  </TableRow>
                ) : (
                  orders.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                      <TableCell>{order.user?.name || order.user?.email || "N/A"}</TableCell>
                      <TableCell className="capitalize">
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
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setEditingOrder(order)
                              setStatus(order.status)
                              setPaymentStatus(order.payment_status)
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page <= 1} />
              </PaginationItem>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink size="sm" isActive={page === p} onClick={() => setPage(p)}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => setPage(page < pagination.pages ? page + 1 : pagination.pages)} disabled={page >= pagination.pages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  )
}
