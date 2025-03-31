import { PrismaClient } from "./generated/client"

const prisma = new PrismaClient()
async function main() {
  console.log("🌱 Starting database seeding...")

  // Clean up existing data
  console.log("🧹 Cleaning up existing data...")
  await prisma.wishlist_item.deleteMany({})
  await prisma.wishlist.deleteMany({})
  await prisma.payment.deleteMany({})
  await prisma.shipping_address.deleteMany({})
  await prisma.order_item.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.address.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.users.deleteMany({})

  // Create users
  console.log("👤 Creating users...")
  const adminUser = await prisma.users.create({
    data: {
      id: "user_2v2E35dLiYgfHGjB4pkWvbIe5Yo",
      name: "Developer",
      email: "testpjmail@gmail.com",
      role: "admin",
    },
  })

  const regularUser = await prisma.users.create({
    data: {
      name: "Francis",
      email: "user@example.com",
      role: "customer",
    },
  })

  // Create addresses for users
  console.log("🏠 Creating addresses...")
  const adminAddress = await prisma.address.create({
    data: {
      user_id: adminUser.id,
      full_name: "Admin User",
      street: "123 Admin St",
      city: "Admin City",
      state: "Admin State",
      zip_code: "12345",
      country: "United States",
      phone: "555-123-4567",
    },
  })

  const userAddress = await prisma.address.create({
    data: {
      user_id: regularUser.id,
      full_name: "Regular User",
      street: "456 User Ave",
      city: "User City",
      state: "User State",
      zip_code: "67890",
      country: "United States",
      phone: "555-987-6543",
    },
  })

  // Create categories
  console.log("📁 Creating categories...")
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Electronics",
        slug: "electronics",
        image: "/placeholder.svg?height=200&width=300",
      },
    }),
    prisma.category.create({
      data: {
        name: "Clothing",
        slug: "clothing",
        image: "/placeholder.svg?height=200&width=300",
      },
    }),
    prisma.category.create({
      data: {
        name: "Home & Kitchen",
        slug: "home-kitchen",
        image: "/placeholder.svg?height=200&width=300",
      },
    }),
    prisma.category.create({
      data: {
        name: "Beauty",
        slug: "beauty",
        image: "/placeholder.svg?height=200&width=300",
      },
    }),
  ])

  // Create products
  console.log("📦 Creating products...")

  // Electronics products
  const electronicsProducts = [
    {
      name: "Wireless Headphones",
      description: "Premium wireless headphones with noise cancellation and long battery life.",
      price: 129.99,
      stock: 50,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[0].id,
    },
    {
      name: "Smart Watch",
      description: "Track your fitness, receive notifications, and more with this smart watch.",
      price: 199.99,
      stock: 30,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[0].id,
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with amazing sound quality and water resistance.",
      price: 79.99,
      stock: 45,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[0].id,
    },
    {
      name: "Laptop",
      description: "Powerful laptop for work and entertainment with high performance specs.",
      price: 999.99,
      stock: 15,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[0].id,
    },
  ]

  // Clothing products
  const clothingProducts = [
    {
      name: "Cotton T-Shirt",
      description: "Comfortable cotton t-shirt available in various colors.",
      price: 24.99,
      stock: 100,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[1].id,
    },
    {
      name: "Slim Fit Jeans",
      description: "Classic slim fit jeans that go with everything.",
      price: 49.99,
      stock: 75,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[1].id,
    },
    {
      name: "Winter Jacket",
      description: "Warm winter jacket with water-resistant exterior.",
      price: 129.99,
      stock: 40,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[1].id,
    },
  ]

  // Home & Kitchen products
  const homeProducts = [
    {
      name: "Coffee Maker",
      description: "Programmable coffee maker with thermal carafe.",
      price: 89.99,
      stock: 35,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[2].id,
    },
    {
      name: "Kitchen Mixer",
      description: "Powerful stand mixer for all your baking needs.",
      price: 249.99,
      stock: 20,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[2].id,
    },
    {
      name: "Bedding Set",
      description: "Luxurious bedding set with sheets, pillowcases, and duvet cover.",
      price: 99.99,
      stock: 30,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[2].id,
    },
  ]

  // Beauty products
  const beautyProducts = [
    {
      name: "Face Moisturizer",
      description: "Hydrating face moisturizer for all skin types.",
      price: 34.99,
      stock: 60,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[3].id,
    },
    {
      name: "Makeup Set",
      description: "Complete makeup set with eyeshadow, lipstick, and more.",
      price: 79.99,
      stock: 25,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category_id: categories[3].id,
    },
  ]

  // Combine all products
  const allProducts = [...electronicsProducts, ...clothingProducts, ...homeProducts, ...beautyProducts]

  // Create products in database
  const products = await Promise.all(
    allProducts.map((product) =>
      prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          images: product.images,
          category_id: product.category_id,
        },
      }),
    ),
  )

  // Create some reviews
  console.log("⭐ Creating product reviews...")
  await Promise.all([
    prisma.review.create({
      data: {
        user_id: regularUser.id,
        product_id: products[0].id,
        rating: 5,
        comment: "These headphones are amazing! Great sound quality and comfortable to wear.",
      },
    }),
    prisma.review.create({
      data: {
        user_id: regularUser.id,
        product_id: products[1].id,
        rating: 4,
        comment: "Love this smart watch! Battery life could be better though.",
      },
    }),
    prisma.review.create({
      data: {
        user_id: adminUser.id,
        product_id: products[0].id,
        rating: 4,
        comment: "Good headphones for the price.",
      },
    }),
  ])

  // Create a wishlist for the regular user
  console.log("💖 Creating wishlist...")
  const wishlist = await prisma.wishlist.create({
    data: {
      user_id: regularUser.id,
      items: {
        create: [{ product_id: products[0].id }, { product_id: products[3].id }],
      },
    },
  })

  // Create an order for the regular user
  console.log("🛒 Creating orders...")
  const order = await prisma.order.create({
    data: {
      user_id: regularUser.id,
      total_amount: 229.98,
      status: "pending",
      payment_status: "paid",
      order_items: {
        create: [
          {
            product_id: products[0].id,
            quantity: 1,
            price: 129.99,
          },
          {
            product_id: products[2].id,
            quantity: 1,
            price: 79.99,
          },
        ],
      },
    },
  })

  // Create shipping address for the order
  await prisma.shipping_address.create({
    data: {
      order_id: order.id,
      full_name: "Regular User",
      street: "456 User Ave",
      city: "User City",
      state: "User State",
      zip_code: "67890",
      country: "United States",
      phone: "555-987-6543",
    },
  })

  // Create payment for the order
  await prisma.payment.create({
    data: {
      order_id: order.id,
      payment_method: "stripe",
      payment_status: "paid",
      transaction_id: "txn_" + Math.random().toString(36).substring(2, 15),
    },
  })

  // Create a second order (shipped status)
  const order2 = await prisma.order.create({
    data: {
      user_id: regularUser.id,
      total_amount: 249.99,
      status: "shipped",
      payment_status: "paid",
      order_items: {
        create: [
          {
            product_id: products[1].id, // Smart Watch
            quantity: 1,
            price: 199.99,
          },
          {
            product_id: products[4].id, // T-Shirt
            quantity: 2,
            price: 24.99,
          },
        ],
      },
    },
  })

  // Create shipping address for the second order
  await prisma.shipping_address.create({
    data: {
      order_id: order2.id,
      full_name: "Regular User",
      street: "456 User Ave",
      city: "User City",
      state: "User State",
      zip_code: "67890",
      country: "United States",
      phone: "555-987-6543",
    },
  })

  // Create payment for the second order
  await prisma.payment.create({
    data: {
      order_id: order2.id,
      payment_method: "paypal",
      payment_status: "paid",
      transaction_id: "txn_" + Math.random().toString(36).substring(2, 15),
    },
  })

  console.log("✅ Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

