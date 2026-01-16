import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity";

export const revalidate = 60;

function formatDate(value?: string) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  excerpt,
  body
}`;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityClient.fetch(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  return (
    <section className="section blog-post full-bleed">
      <div className="blog-post-inner">
        <p className="section-kicker">Blog</p>
        <p className="blog-date">{formatDate(post.publishedAt as string | undefined)}</p>
        <div className="blog-hero" aria-hidden="true"></div>
        <h1 className="section-title">{post.title as string}</h1>
        <p className="section-lede">{post.excerpt as string}</p>
        <div className="blog-post-body">
          {Array.isArray(post.body) ? <PortableText value={post.body} /> : null}
        </div>
      </div>
    </section>
  );
}
