import { PrismaClient, Product, User } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";
import { hashPassword } from "@/lib/auth";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
    },
  });

  const home = await prisma.category.create({
    data: {
      name: "Home",
      slug: "home",
    },
  });

  const products: Product[] = [
    // --- ELECTRONICS ---
    {
      id: "1",
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones with long battery life.",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
      categoryId: electronics.id,
      slug: "wireless-headphones",
      inventory: 15,
    },
    {
      id: "2",
      name: "Smart Watch",
      description:
        "Fitness tracker with heart rate monitoring and sleep analysis.",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
      categoryId: electronics.id,
      slug: "smart-watch",
      inventory: 10,
    },
    {
      id: "6",
      name: "Mechanical Keyboard",
      description:
        "RGB backlit mechanical keyboard with tactile switches for gaming and coding.",
      price: 49.5,
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000",
      categoryId: electronics.id,
      slug: "mechanical-keyboard",
      inventory: 8,
    },
    {
      id: "7",
      name: "Portable Bluetooth Speaker",
      description:
        "Waterproof speaker with 360-degree sound and 20-hour battery life.",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1643385958950-8f0b8852171a?q=80&w=1000",
      categoryId: electronics.id,
      slug: "bluetooth-speaker",
      inventory: 25,
    },

    // --- CLOTHING ---
    {
      id: "3",
      name: "Running Shoes",
      description: "Lightweight running shoes with responsive cushioning.",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000",
      categoryId: clothing.id,
      slug: "running-shoes",
      inventory: 3,
    },
    {
      id: "5",
      name: "Leather Backpack",
      description: "Durable leather backpack with multiple compartments.",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=1000",
      categoryId: clothing.id,
      slug: "leather-backpack",
      inventory: 1,
    },
    {
      id: "8",
      name: "Cotton Hoodie",
      description:
        "Comfortable oversized hoodie made from 100% organic cotton.",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
      categoryId: clothing.id,
      slug: "cotton-hoodie",
      inventory: 12,
    },
    {
      id: "9",
      name: "Jeans Trousers",
      description: "Classic blue denim jacket with a vintage wash.",
      price: 110.0,
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000",
      categoryId: clothing.id,
      slug: "denim-jacket",
      inventory: 5,
    },

    // --- HOME ---
    {
      id: "4",
      name: "Ceramic Mug",
      description: "Handcrafted ceramic mug with minimalist design.",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000",
      categoryId: home.id,
      slug: "ceramic-mug",
      inventory: 0,
    },
    {
      id: "10",
      name: "Minimalist Table Lamp",
      description:
        "Elegant desk lamp with adjustable brightness and warm light.",
      price: 64.99,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000",
      categoryId: home.id,
      slug: "table-lamp",
      inventory: 7,
    },
    {
      id: "11",
      name: "Scented Candle Set",
      description:
        "Set of 3 soy wax candles with lavender, sandalwood, and citrus scents.",
      price: 32.0,
      image:
        "https://images.unsplash.com/photo-1619695662870-32c1e1c91142?q=80&w=1000",
      categoryId: home.id,
      slug: "scented-candles",
      inventory: 20,
    },
    {
      id: "12",
      name: "Indoor Plant Pot",
      description:
        "Modern terracotta pot perfect for succulents or small indoor plants.",
      price: 18.5,
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000",
      categoryId: home.id,
      slug: "plant-pot",
      inventory: 14,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  const users: User[] = [
    {
      id: "1",
      email: "admin@example.com",
      password: "password123",
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      email: "test@example.com",
      password: "test",
      name: "Regular User",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const user of users) {
    const hashedPassword = await hashPassword(user.password);
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
  console.log("Users created");
}

main()
  .then(async () => {
    console.log("Seeding complete!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
