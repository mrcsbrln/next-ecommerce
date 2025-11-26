"use client";

import { Product } from "@/app/generated/prisma";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { addToCart } from "@/lib/actions";

export default function AddToCartButton({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Error adding to Cart:", error);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.inventory === 0 || isAdding}
      className="w-full"
    >
      <ShoppingCart className="mr-1 w-4 h-4" />
      {product.inventory > 0 ? "Add to cart" : "Out of stock"}
    </Button>
  );
}
