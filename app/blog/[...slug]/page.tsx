type Props = {
  params: {
    slug: string[];
  };
};

export default function BlogDetailPage({ params: { slug } }: Props) {
  console.log(slug);
  return <div>본문</div>;
}
