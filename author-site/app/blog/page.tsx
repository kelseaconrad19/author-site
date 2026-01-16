import { sanityClient } from "@/lib/sanity";

export const revalidate = 60;

type Post = {
  slug: string;
  title: string;
  publishedAt?: string;
  excerpt?: string;
};

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

async function getPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      publishedAt,
      excerpt
    }`
  );
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <section className="section blog-index full-bleed">
      <div className="blog-index-inner">
        <p className="section-kicker">Blog</p>
        <h1 className="section-title">Writing craft, process, and publishing insights.</h1>
        <p className="section-lede">
          A growing library of essays, tools, and behind-the-scenes strategy for authors.
        </p>
        {posts.length === 0 ? (
          <p className="card-text">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid blog-index-grid">
            {posts.map((post) => (
              <article key={post.slug} className="card blog-card">
                <p className="blog-date">{formatDate(post.publishedAt)}</p>
                <h2 className="card-title">{post.title}</h2>
                <p className="card-text">{post.excerpt}</p>
                <a className="blog-link" href={`/blog/${post.slug}`}>
                  Read the post
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
