"use client";

import { getPosts } from "@/actions/search-post";
import { useSearch } from "@/model/use-search";
import { useQuery } from "@tanstack/react-query";
import AccordionCategory from "./accordion-category";
import { FullScreenLoader } from "../../common/full-screen-loader";

export function CategoryMenu() {
  const { data: menu, isLoading } = useQuery({
    queryKey: ["category-menu"],
    queryFn: () => getPosts(),
  });
  const text = useSearch((state) => state.text);

  if (isLoading) return <FullScreenLoader />;

  return (
    <nav className="h-full">
      <AccordionCategory menu={menu} path="/blog" />
      <AccordionCategory menu={menu} path="/blog" />
      <AccordionCategory menu={menu} path="/blog" />
      <AccordionCategory menu={menu} path="/blog" />
      <AccordionCategory menu={menu} path="/blog" />
      <AccordionCategory menu={menu} path="/blog" />
      <AccordionCategory menu={menu} path="/blog" />
    </nav>
  );
}
