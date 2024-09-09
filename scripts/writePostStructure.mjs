import { promises as fs } from "fs";
import path from "path";

const getPosts = async (params) => {
  const { structure, nextPath } = params ?? {};
  const rootPath = nextPath ? nextPath : path.join("public/blog/posts");
  const fileStructure = structure ?? {};

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

const writePostStructure = async () => {
  const fileStructure = await getPosts();

  const structurePath = path.join("public/blog/structure.json");
  await fs.writeFile(structurePath, JSON.stringify(fileStructure, null, 2));
};

(async () => {
  try {
    await writePostStructure();
    console.log("Structure file has been created successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
