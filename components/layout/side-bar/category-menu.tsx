"use client";

import { searchPostStructure } from "@/actions/search-post-structure";
import { useSearch } from "@/model/use-search";
import { useQuery } from "@tanstack/react-query";
import AccordionCategory from "./accordion-category";
import { FullScreenLoader } from "../../common/full-screen-loader";

export function CategoryMenu() {
  const text = useSearch((state) => state.text);
  const { data: menu, isLoading } = useQuery({
    queryKey: ["category-menu", text],
    queryFn: ({ queryKey }) => searchPostStructure(queryKey[1]),
  });

  if (isLoading) return <FullScreenLoader />;
  if (!menu) return "카테고리가 없습니다.";

  return (
    <nav className="h-full">
      {Object.keys(menu).length > 0 ? (
        <AccordionCategory menu={menu} path="/blog" />
      ) : null}
    </nav>
  );
}
