"use server";

import { promises as fs } from "fs";
import path from "path";

import { PostMeta } from "@/types/post";

const HEADER_REGEX = /(\w+):\s*["']?([^"'\n]+)["']?/g;
const CONTENT_SEPARATOR = "---";

const getPostMarkdown = async (slug: string[]): Promise<string> => {
  const postPath = path.join(
    process.cwd(),
    "public",
    "blog",
    "posts",
    ...slug,
    "post.md"
  );
  try {
    return await fs.readFile(postPath, "utf-8");
  } catch (error) {
    throw new Error(`Failed to read post markdown: ${error.message}`);
  }
};

const getHeaderContent = (headerString: string) => {
  const resultObject: Partial<PostMeta> = {};
  let match;

  // eslint-disable-next-line no-cond-assign
  while ((match = HEADER_REGEX.exec(headerString)) !== null) {
    const [, key, value] = match;
    if (key && value) {
      if (["prev", "next"].includes(key) && value === "null") {
        resultObject[key] = null;
      } else {
        resultObject[key] = value;
      }
    }
  }

  return resultObject;
};

export const getThumbnailPath = async (
  slug: Array<string>,
  extension: string = "jpg"
): Promise<string> => `/blog/posts/${slug.join("/")}/thumbnail.${extension}`;

export const getPost = async (slug: Array<string>) => {
  try {
    const result = await getPostMarkdown(slug);
    const [headerString, content] = result.split(CONTENT_SEPARATOR);
    const headerContent = getHeaderContent(headerString);

    return { content, headerContent };
  } catch (error) {
    throw new Error(`Failed to get post: ${error.message}`);
  }
};
