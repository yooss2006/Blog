"use client";

import { FileText, Folder } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  menu: Record<string, any>;
  path?: string;
  level?: number;
};

export default function AccordionCategory({
  menu,
  path = "",
  level = 0,
}: Props) {
  const pathname = decodeURIComponent(usePathname());
  const pathnameSet = pathname.split("/").slice(2); // ["", "blog"]를 지우기 위함
  const currentLevelPath = pathnameSet[level];

  const dynamicPaddingLeft = `${8 + level * 16}px`;
  const menuNames = Object.keys(menu);
  return (
    <Accordion type="single" collapsible defaultValue={currentLevelPath}>
      {menuNames.map((menuName) => {
        const item = menu[menuName];
        const isPost = item.post && item.post.slice(-3) === ".md";
        const nextPath = `${path}/${menuName}`;
        const nextKey = `${menuName}${path && `-${path}`}`;

        if (isPost) {
          return (
            <Link
              key={nextKey}
              href={nextPath}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "py-4 m-2 leading-6 flex justify-start border-none gap-2",
                pathname === `${path}/${menuName}` &&
                  "font-semibold bg-pointColor text-white"
              )}
              style={{ paddingLeft: dynamicPaddingLeft }}
            >
              <FileText className="w-4 h-4" />
              <span className="max-w-64 text-ellipsis truncate">
                {menuName}
              </span>
            </Link>
          );
        }
        return (
          <AccordionItem key={nextKey} value={menuName} className="border-none">
            <AccordionTrigger
              className="mx-2 mb-3 p-3 justify-between items-center gap-2 font-bold bg-slate-50 [&[data-state=open]]:drop-shadow-md [&[data-state=open]>p>svg]:text-pointColor hover:bg-slate-100 hover:no-underline"
              style={{ paddingLeft: dynamicPaddingLeft }}
            >
              <p className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span className="max-w-48 text-ellipsis truncate">
                  {menuName}
                </span>
              </p>
            </AccordionTrigger>
            <AccordionContent className="pb-1">
              <AccordionCategory
                menu={menu[menuName]}
                path={nextPath}
                level={level + 1}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
