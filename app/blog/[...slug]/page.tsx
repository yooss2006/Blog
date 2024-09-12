import { getPost } from "@/actions/post";
import CommentViewer from "@/components/post/comment-viewer";
import MarkdownViewer from "@/components/post/markdown-viewer";
import PostHeader from "@/components/post/post-header";

type Props = {
  params: {
    slug: string[];
  };
};

export default async function BlogDetailPage({ params: { slug } }: Props) {
  const { headerContent, content } = await getPost(slug);
  return (
    <section className="h-full relative overflow-y-auto hide-scrollbar text-normalColor">
      <PostHeader {...headerContent} slug={slug} />
      <article className="px-10 pb-10 mx-auto flex flex-col gap-8 md:w-[1200px] md:pb-32">
        <MarkdownViewer content={content} />
        <CommentViewer />
      </article>
    </section>
  );
}
