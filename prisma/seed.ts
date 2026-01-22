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
    {
      id: "1",
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones with long battery life.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
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
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics.id,
      slug: "smart-watch",
      inventory: 10,
    },
    {
      id: "3",
      name: "Running Shoes",
      description: "Lightweight running shoes with responsive cushioning.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      categoryId: clothing.id,
      slug: "running-shoes",
      inventory: 3,
    },
    {
      id: "4",
      name: "Ceramic Mug",
      description: "Handcrafted ceramic mug with minimalist design.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
      categoryId: home.id,
      slug: "ceramic-mug",
      inventory: 0,
    },
    {
      id: "5",
      name: "Leather Backpack",
      description: "Durable leather backpack with multiple compartments.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      categoryId: clothing.id,
      slug: "leather-backpack",
      inventory: 1,
    },
    {
      id: "6",
      name: "Gaming Mouse",
      description: "High-precision gaming mouse with customizable RGB lighting.",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1547038577-da48bc6a3480",
      categoryId: electronics.id,
      slug: "gaming-mouse",
      inventory: 20,
    },
    {
      id: "7",
      name: "Denim Jacket",
      description: "Classic denim jacket for all seasons.",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1588628084042-e14b2d18b2b9",
      categoryId: clothing.id,
      slug: "denim-jacket",
      inventory: 8,
    },
    {
      id: "8",
      name: "Smart LED Bulb",
      description: "App-controlled LED bulb with millions of colors.",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1596207019777-a8a5b3a3b4e7",
      categoryId: home.id,
      slug: "smart-led-bulb",
      inventory: 30,
    },
    {
      id: "9",
      name: "Portable Speaker",
      description: "Compact Bluetooth speaker with powerful sound and long battery life.",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1545465902-861f6004942c",
      categoryId: electronics.id,
      slug: "portable-speaker",
      inventory: 12,
    },
    {
      id: "10",
      name: "Yoga Mat",
      description: "Eco-friendly yoga mat for comfortable workouts.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1570776092790-256d9812e987",
      categoryId: home.id,
      slug: "yoga-mat",
      inventory: 25,
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
      email: "user@example.com",
      password: "password456",
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
