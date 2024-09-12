import { cn } from "@/lib/utils";

import styles from "./morphing-blob.module.css";

const loaderVariants = {
  large: {
    loader: "w-[200px] h-[200px]",
    blob: "w-[100px] h-[100px]",
  },
  normal: {
    loader: "w-[100px] h-[100px]",
    blob: "w-[50px] h-[50px]",
  },
};

export function MorphingBlob({
  size = "normal",
}: {
  size?: keyof typeof loaderVariants;
}) {
  return (
    <div className={cn(styles.loader, loaderVariants[size].loader)}>
      <div className={cn(styles.blob, loaderVariants[size].blob)} />
    </div>
  );
}
