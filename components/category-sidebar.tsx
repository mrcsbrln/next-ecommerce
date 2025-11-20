import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import Link from "next/link";

export async function CategorySideBar({
  acticeCategory,
}: {
  activeCategory?: string;
}) {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  await sleep(2000);

  return (
    <div className="w-[125px] flex-none">
      <h3 className="text-sm text-muted-foreground">Collections</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/search/${category.slug}`}
              className={`text-sm hover:text-primary ${
                acticeCategory === category.slug ? "underline" : ""
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
