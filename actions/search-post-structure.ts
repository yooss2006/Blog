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
  function search(current: PostStructure, pathArray: Array<string> = []): void {
    Object.keys(current).forEach((key) => {
      const value = current[key];

      if (
        key.includes(keyword) &&
        typeof value === "object" &&
        "post" in value
      ) {
        let temp = result;
        pathArray.forEach((pathKey, index) => {
          if (index < pathArray.length - 1) {
            temp[pathKey] = temp[pathKey] || {};
            temp = temp[pathKey] as PostStructure;
          } else {
            temp[pathKey] = temp[pathKey] || {};
            temp[pathKey][key] = value;
          }
        });

        if (pathArray.length === 0) {
          result[key] = value;
        }
      }

      if (typeof value === "object" && value !== null && !("post" in value)) {
        search(value as PostStructure, [...pathArray, key]);
      }
    });
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
    return undefined;
  }
};
