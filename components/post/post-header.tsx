import { ChevronDownCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

import { getThumbnailPath } from "@/actions/post";
import { PostMeta } from "@/types/post";

type Props = {
  slug: Array<string>;
} & Partial<PostMeta>;

export default async function PostHeader({
  title,
  description,
  date,
  slug,
}: Props) {
  const thumbnailPath = await getThumbnailPath(slug);
  return (
    <header className="w-full h-full px-10 flex flex-col justify-center items-center relative">
      <div className="text-center">
        <Image
          width={400}
          height={400}
          className="w-[400px] h-[400px] mx-auto object-cover rounded-md shadow-md"
          src={thumbnailPath}
          alt={`${title} 이미지`}
          priority
        />
        <h2 className="pt-4 pb-6 text-7xl font-bold text-pointColor">
          {title}
        </h2>
        <p className="text-xl my-2 break-word">{description}</p>
        <p className="font-light">{date}</p>
      </div>
      <ChevronDownCircle className="w-8 h-8 absolute left-[50%] translate-x-[-50%] bottom-20" />
    </header>
  );
}
