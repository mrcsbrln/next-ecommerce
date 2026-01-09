"use server";

import { cookies } from "next/headers";
import { getCart } from "./actions";
import { prisma } from "./prisma";
import { createCheckoutSession, OrderWithItemsAndProduct } from "./stripe";
import { auth } from "./auth";

export type ProcessCheckoutResponse = {
  sessionUrl: string;
  order: OrderWithItemsAndProduct;
};

export async function processCheckout(): Promise<ProcessCheckoutResponse> {
  const cart = await getCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let orderId: string | null = null;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const total = cart.subtotal;
      const newOrder = await tx.order.create({
        data: {
          total,
          userId: userId || null,
        },
      });
      const orderItems = cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        orderId: newOrder.id,
        price: item.product.price,
      }));

      await tx.orderItem.createMany({
        data: orderItems,
      });

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await tx.cart.delete({
        where: {
          id: cart.id,
        },
      });

      return newOrder;
    });

    orderId = order.id;

    // Reload full order
    const fullOrder = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    // Confirm the order was loaded
    if (!fullOrder) {
      throw new Error("Order not found");
    }
    // Create the stripe session
    const { sessionId, sessionUrl } = await createCheckoutSession(fullOrder);
    // Return the sessiion URL and handle the errors
    if (!sessionId || !sessionUrl) {
      throw new Error("Failed to create Stripe session");
    }
    // Store the session ID in the order & change the oder status
    await prisma.order.update({
      where: {
        id: fullOrder.id,
      },
      data: {
        stripeSessionId: sessionId,
        status: "pending_payment",
      },
    });

    (await cookies()).delete("cartId");

    return {
      sessionUrl,
      order: fullOrder,
    };
  } catch (error) {
    // optional: change the order status to failed
    if (orderId && error instanceof Error && error.message.includes("Stripe")) {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "failed",
        },
      });
    }
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}
