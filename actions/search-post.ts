"use server";

import { promises as fs } from "fs";
import path from "path";

type BlogPostStructureType = {
  structure: Record<string, any>;
  nextPath: string;
};

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

export const searchPosts = async (keyword: string): Promise<PostStructure> => {
  const postStructure = await getPosts();
  if (!keyword) return postStructure;
  return findObjectWithPost(postStructure, keyword);
};

export const getPosts = async (
  params?: BlogPostStructureType
): Promise<Record<string, any>> => {
  const { structure, nextPath } = params ?? {};
  const rootPath = nextPath
    ? nextPath
    : path.join(process.cwd(), "public", "blog", "posts");
  const fileStructure: Record<string, any> = structure ?? {};

  const files = await fs.readdir(rootPath, { withFileTypes: true });

  const sortedFiles = files
    .filter((file) => file.isDirectory() || file.name.endsWith(".md"))
    .sort((a, b) => {
      if (
        (a.isDirectory() && b.isDirectory()) ||
        (!a.isDirectory() && !b.isDirectory())
      )
        return a.name.localeCompare(b.name);
      return a.isDirectory() ? -1 : 1;
    });

  const filePromises = sortedFiles.map(async (file) => {
    if (file.isDirectory()) {
      fileStructure[file.name] = await getPosts({
        structure: {},
        nextPath: path.join(rootPath, file.name),
      });
    } else if (file.name.endsWith(".md")) {
      fileStructure["post"] = file.name;
    }
  });

  await Promise.all(filePromises);

  return fileStructure;
};

// export function getBlogStructure(param?: BlogPostStructureTYpe) {
//   const rootPath = param
//     ? param.nextPath
//     : path.join(process.cwd(), "public", "blog", "posts");
//   const files = readdirSync(rootPath, { withFileTypes: true });
//   const fileStructure: Record<string, any> = param ? param.structure : {};

//   files
//     .filter((file) => file.isDirectory() || file.name.includes(".md"))
//     .sort((a, b) => {
//       if (
//         (a.isDirectory() && b.isDirectory()) ||
//         (!a.isDirectory() && !b.isDirectory())
//       )
//         return a.name.localeCompare(b.name);
//       return a.isDirectory() ? -1 : 1;
//     })
//     .forEach((file) => {
//       if (file.isDirectory()) {
//         fileStructure[file.name] = getBlogStructure({
//           structure: {},
//           nextPath: path.join(rootPath, file.name),
//         });
//       } else if (file.name.includes(".md")) {
//         fileStructure[file.name.slice(0, -3)] = file.name;
//       }
//     });

//   return fileStructure;
// }

// export async function getThumbnailPath(
//   pathSet: string[],
//   extension: string = ".jpg"
// ): Promise<string> {
//   return `/blog-post/${pathSet.join("/")}/thumbnail${extension}`;
// }

// export async function getPostMarkdown(pathSet: string[]): Promise<any> {
//   const filePath = path.join(
//     process.cwd(),
//     "public",
//     "blog-post",
//     ...pathSet,
//     "post.md"
//   );
//   const content = await readFile(filePath, "utf-8");
//   return content;
// }

// export async function getHeaderContent(
//   pathSet: Array<string>
// ): Promise<Record<string, string>> {
//   const data = await getPostMarkdown(pathSet).then(
//     (res) => res.split("---")[0]
//   );
//   const resultObject: Record<string, string> = {};

//   const regex = /(\w+):\s*["']?([^"'\n]+)["']?/g;
//   let match;

//   while ((match = regex.exec(data)) !== null) {
//     const key = match[1] as string;
//     const value = match[2] as string;
//     if (key && value) resultObject[key] = value;
//   }

//   return resultObject;
// }

// export async function getPostContent(pathSet: Array<string>) {
//   return await getPostMarkdown(pathSet).then((res) => res.split("---")[1]);
// }
