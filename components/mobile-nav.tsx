import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { categories } from "./navbar";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <nav className="flex flex-col gap-4 p-4">
            <SheetClose asChild>
              <Link href="/">Home</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/products">Products</Link>
            </SheetClose>
            <div>
              <h3 className="text-xs font-medium mb-2 text-muted-foreground">
                Categories
              </h3>
              {categories.map((categorie) => (
                <SheetClose asChild key={categorie.id}>
                  <Link
                    href={categorie.href}
                    className="block py-2 text-sm font-medium"
                  >
                    {categorie.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
