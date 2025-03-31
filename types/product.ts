export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category_id: string
  images: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: string
  name: string
  description?: string
}

export interface CartItem {
  id: string
  productId: string
  product?: Product
  quantity: number
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
}

