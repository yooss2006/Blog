"use client";

import { searchPosts } from "@/actions/search-post";
import { useSearch } from "@/model/use-search";
import { useQuery } from "@tanstack/react-query";
import AccordionCategory from "./accordion-category";
import { FullScreenLoader } from "../../common/full-screen-loader";

export function CategoryMenu() {
  const text = useSearch((state) => state.text);
  const { data: menu, isLoading } = useQuery({
    queryKey: ["category-menu", text],
    queryFn: ({ queryKey }) => searchPosts(queryKey[1]),
  });

  if (isLoading) return <FullScreenLoader />;

  return (
    <nav className="h-full">
      {Object.keys(menu).length > 0 ? (
        <AccordionCategory menu={menu} path="/blog" />
      ) : null}
    </nav>
  );
}
