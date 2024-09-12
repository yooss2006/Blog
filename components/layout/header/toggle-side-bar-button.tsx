"use client";

import { cn } from "@/lib/utils";
import { useSideBar } from "@/model/use-sidebar";

const buttonVariants = {
  buttonSize: {
    small: "w-6 h-5",
    middle: "w-7 h-6",
    large: "w-10 h-8",
  },
  lineHeight: {
    small: "h-0.5",
    middle: "h-[3px]",
    large: "h-1",
  },
  lineSpacing: {
    small: "-top-2 top-2",
    middle: "-top-[10px] top-[10px]",
    large: "-top-3 top-3",
  },
};

export default function ToggleSideBarButton({
  size = "middle",
}: {
  size?: keyof typeof buttonVariants.buttonSize;
}) {
  const { isOpen, toggle } = useSideBar((state) => ({
    isOpen: state.isOpen,
    toggle: state.toggle,
  }));

  const lineHeights = buttonVariants.lineHeight[size];
  const lineSpacings = buttonVariants.lineSpacing[size];

  return (
    <button
      type="button"
      className={cn("relative cursor-pointer", buttonVariants.buttonSize[size])}
      aria-label="toggle menu"
      onClick={toggle}
    >
      <span
        className={cn(
          "block absolute left-0 w-full bg-normalColor transition-all duration-300",
          lineHeights,
          isOpen ? "bg-transparent" : "top-1/2 -translate-y-1/2",
        )}
      >
        <span
          className={cn(
            "block absolute left-0 w-full bg-normalColor transition-all duration-300",
            lineHeights,
            isOpen ? "top-0 rotate-45" : lineSpacings.split(" ")[0],
          )}
        />
        <span
          className={cn(
            "block absolute left-0 w-full bg-normalColor transition-all duration-300",
            lineHeights,
            isOpen ? "top-0 -rotate-45" : lineSpacings.split(" ")[1],
          )}
        />
      </span>
    </button>
  );
}
