"use client";

import { useMedia } from "@/hooks/use-media";
import { CategoryMenu } from "./category-menu";
import SearchInput from "./search-input";
import { useEffect, useState } from "react";
import { useSideBar } from "@/model/use-sidebar";
import {
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../ui/sheet";
import { LoadingPage } from "@/components/common/loading-page";

function MobileSideBar() {
  const { isOpen, onclose, toggle } = useSideBar((state) => ({
    isOpen: state.isOpen,
    onclose: state.onClose,
    toggle: state.toggle,
  }));

  useEffect(() => {
    onclose();
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={toggle}>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="mb-3">
          <SheetTitle>블로그 메뉴</SheetTitle>
          <SheetDescription>블로그를 둘러보세요.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col gap-2">
            <SearchInput />
            <div className="grow overflow-y-auto custom-scrollbar">
              <CategoryMenu />
            </div>
            <div>블로그</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DesktopSideBar() {
  return (
    <div className="py-4 px-2 basis-[400px] border-r-2 border-normalColor">
      <div className="h-full flex flex-col gap-3">
        <SearchInput />
        <div className="grow overflow-y-auto custom-scrollbar">
          <CategoryMenu />
        </div>
        <div>깃허브</div>
      </div>
    </div>
  );
}

export default function SideBar() {
  const [mounted, setMounted] = useState<boolean>(false);
  const isWide = useMedia("(min-width: 1024px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingPage />;

  return <>{isWide ? <DesktopSideBar /> : <MobileSideBar />}</>;
}
