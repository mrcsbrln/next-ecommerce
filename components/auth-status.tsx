"use client";

import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";

export default function AuthStatus() {
  const { status } = useSession();

  if (status === "loading") {
    return <Skeleton className="w-9 h-9" />;
  }

  if (status === "unauthenticated") {
    return (
      <Button variant="ghost" size="icon" asChild>
        <Link href="/auth/signin">
          <LogIn className="h-5 w-5" />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={() => signOut()}>
      <LogOut className="h-5 w-5" />
    </Button>
  );
}
