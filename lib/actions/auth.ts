"use server";

import z from "zod";
import { hashPassword } from "../auth";
import { prisma } from "../prisma";
import { RegisterSchemaType, RegisterSchema } from "../schemas";

export async function registerUser(data: RegisterSchemaType) {
  const validationResult = RegisterSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Invalid data provided",
      issues: z.treeifyError(validationResult.error),
    };
  }

  const { email, password, name } = validationResult.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: "user",
      },
    });

    const userWithoutPassword = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Registration Server Action Error:", error);
    return {
      success: false,
      error: "Could not create account. Please try again later.",
    };
  }
}
