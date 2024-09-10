"use server";

import { promises as fs } from "fs";
import path from "path";

interface PostStructure {
  [key: string]: PostStructure | { post: string };
}

function findObjectWithPost(
  postStructure: Record<string, any>,
  keyword: string
): PostStructure {
  const result: PostStructure = {};

  function search(current: PostStructure, path: string[] = []) {
    for (const [key, value] of Object.entries(current)) {
      if (
        key.includes(keyword) &&
        typeof value === "object" &&
        "post" in value
      ) {
        let temp = result;
        for (let i = 0; i < path.length; i++) {
          temp[path[i]] = temp[path[i]] || {};
          temp = temp[path[i]] as PostStructure;
        }
        temp[key] = value;
      }

      if (typeof value === "object" && value !== null && !("post" in value)) {
        search(value as PostStructure, [...path, key]);
      }
    }
  }

  search(postStructure);
  return result;
}

export const searchPostStructure = async (
  keyword: string
): Promise<PostStructure> => {
  try {
    const structurePath = path.join(
      process.cwd(),
      "public",
      "blog",
      "structure.json"
    );
    const fileContents = await fs.readFile(structurePath, "utf8");
    const structure = JSON.parse(fileContents);

    return findObjectWithPost(structure, keyword);
  } catch (error) {
    console.error(error);
    return;
  }
};
