import { getPost } from "@/actions/post";
import PostHeader from "@/components/post/post-header";

type Props = {
  params: {
    slug: string[];
  };
};

export default async function BlogDetailPage({ params: { slug } }: Props) {
  const { headerContent } = await getPost(slug);
  return (
    <section className="h-full relative overflow-y-auto hide-scrollbar text-normalColor">
      <PostHeader {...headerContent} slug={slug} />
      {/* <article className="mx-auto px-10 pb-10 md:w-[800px] md:pb-32 flex flex-col gap-8">
        <MarkdownViewer content={content} />
        <LikePost post={post} />
        <ContentNavigationButtons prev={prev} next={next} />
        <CommentsContainer slug={slug} />
      </article> */}
    </section>
  );
}
