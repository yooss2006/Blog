import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getPosts } from "@/actions/search-post";

export async function GET() {
  const cwd1 = path.join(process.cwd(), "public");
  const rootContents1 = await fs.readdir(cwd1);

  const cwd2 = path.join(process.cwd(), "public", "blog");
  const rootContents2 = await fs.readdir(cwd2);

  const cwd3 = path.join(process.cwd(), "public", "blog", "posts");
  const rootContents3 = await fs.readdir(cwd3);

  const files = await getPosts();

  return NextResponse.json({
    rootContents1,
    rootContents2,
    rootContents3,
    files,
  });
}
