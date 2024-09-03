"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Folder } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
  const currentLevelPath = usePathname().split("/").slice(2)[level];
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
                currentLevelPath === menuName && "font-semibold bg-red-50"
              )}
              style={{ paddingLeft: dynamicPaddingLeft }}
            >
              <FileText className="w-4 h-4" />
              <p className="max-w-64 text-ellipsis truncate">{menuName}</p>
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
                <p className="max-w-48 text-ellipsis truncate">{menuName}</p>
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
