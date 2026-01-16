import Image from "next/image";
import { sanityClient } from "@/lib/sanity";
import NewsletterForm from "./components/NewsletterForm";

export const revalidate = 60;

type Service = {
  title: string;
  slug: string;
  summary?: string;
  imageUrl?: string;
};

type Course = {
  title: string;
  slug: string;
  summary?: string;
  imageUrl?: string;
};

type Book = {
  title: string;
  slug: string;
  blurb?: string;
  coverImageUrl?: string;
};

type Post = {
  title: string;
  slug: string;
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

async function getServices(): Promise<Service[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc, title asc) {
      title,
      "slug": slug.current,
      summary,
      "imageUrl": image.asset->url
    }`
  );
}

async function getCourses(): Promise<Course[]> {
  return sanityClient.fetch(
    `*[_type == "course"] | order(order asc, title asc) {
      title,
      "slug": slug.current,
      summary,
      "imageUrl": image.asset->url
    }`
  );
}

async function getBooks(): Promise<Book[]> {
  return sanityClient.fetch(
    `*[_type == "book"] | order(order asc, title asc) {
      title,
      "slug": slug.current,
      blurb,
      "coverImageUrl": coverImage.asset->url
    }`
  );
}

async function getRecentPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...3] {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt
    }`
  );
}

export default async function Home() {
  const [services, courses, books, posts] = await Promise.all([
    getServices(),
    getCourses(),
    getBooks(),
    getRecentPosts(),
  ]);

  const recentBooks = books.slice(0, 3);

  return (
    <>
      <section className="hero full-bleed">
        <div className="hero-ambient" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker">
              {/* <span className="kicker-pill">Finally Creative</span> */}
              {/* <span className="kicker-dot">•</span>
              <span className="kicker-note">Writing studio for determined authors</span> */}
            </div>
            <h1 className="hero-title">Turn “someday” into a finished draft.</h1>
            <p className="hero-text">
              Practical tools, honest advice, and behind-the-scenes strategy for authors who want
              to finish stories and find readers.
            </p>
            <div className="hero-actions">
              <a className="button" href="#contact">
                Get your free writing toolkit
              </a>
              <a className="button secondary" href="/books">
                Explore my books
              </a>
            </div>
            <div className="hero-metrics">
              <div className="metric-card">
                <p className="metric-value">10+ yrs</p>
                <p className="metric-label">Writing + teaching</p>
              </div>
              <div className="metric-card">
                <p className="metric-value">30 min</p>
                <p className="metric-label">Weekly sprint plan</p>
              </div>
              <div className="metric-card">
                <p className="metric-value">2x</p>
                <p className="metric-label">Draft momentum</p>
              </div>
            </div>
          </div>
          <div className="card featured-card">
            <div className="featured-header">
              <p className="featured-label">Featured Release</p>
              <span className="featured-pill">New</span>
            </div>
            <div className="featured-body">
              <Image
                src="/UnfitCover.png"
                alt="Unfit book cover"
                width={260}
                height={400}
                sizes="(max-width: 720px) 70vw, 260px"
                className="book-cover-image"
                priority
                unoptimized
              />
              <div className="featured-content">
                <h2 className="featured-title">Unfit</h2>
                <p className="featured-meta">A novel by Kelsea Conrad</p>
                <p className="card-text">
                  The Marigold Letters blends historical intrigue with modern discovery. A dual
                  timeline story about women who leave behind more than they intended.
                </p>
                <div className="tag-list">
                  <span className="tag">Psychological</span>
                  <span className="tag">Domestic Thriller</span>
                  {/* <span className="tag">Thriller</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section full-bleed">
        <div className="about-inner">
          <div className="about-content">
            <h2 className="section-title">About Me</h2>
            <p className="section-lede">
              I’m Kelsea, the writer behind Finally Creative—an English teacher who’s spent years
              helping people make words work. This space is for authors who are tired of vague
              advice and ready for practical tools, honest guidance, and real behind-the-scenes
              strategies. Whether you’re trying to finish a draft, tighten your craft, or build an
              audience without losing your mind, you’re in the right place. Grab a resource, take
              what you need, and let’s turn “someday” into done.
            </p>
          </div>
          <div className="about-image">
            <Image
              src="/head-shot.png"
              alt="Kelsea Conrad headshot"
              width={520}
              height={640}
              className="about-image-img"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section id="services" className="section services-section full-bleed">
        <div className="services-shell">
          <div className="services-intro">
            <p className="section-kicker">Services + Courses</p>
            <h2 className="section-title">Support to finish, refine, and publish with confidence.</h2>
            <p className="section-lede">
              A mix of hands-on editorial support and self-paced learning. Choose what you need
              right now, and scale up as your project grows.
            </p>
          </div>
          <div className="services-panels">
            <div className="services-group">
              <div className="group-header">
                <h3>Editing services</h3>
                <p>Tailored feedback that respects your voice.</p>
              </div>
              {services.length === 0 ? (
                <p className="card-text">Add services in Sanity to populate this list.</p>
              ) : (
                <div className="service-list">
                  {services.map((service) => (
                    <article key={service.slug} className="service-card">
                      <div className="service-media">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="service-image"
                          />
                        ) : (
                          <div className="service-image-placeholder" aria-hidden="true"></div>
                        )}
                      </div>
                      <div className="service-content">
                        <h4>{service.title}</h4>
                        <p>{service.summary}</p>
                        <div className="service-actions">
                          {service.slug ? (
                            <a className="button ghost" href={`/services/${service.slug}`}>
                              Learn more
                            </a>
                          ) : (
                            <a className="button ghost" href="#contact">
                              Learn more
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
            <div className="services-group">
              <div className="group-header">
                <h3>Courses</h3>
                <p>Guided learning for busy writers.</p>
              </div>
              {courses.length === 0 ? (
                <p className="card-text">Add courses in Sanity to populate this list.</p>
              ) : (
                <div className="service-list">
                  {courses.map((course) => (
                    <article key={course.slug} className="service-card">
                      <div className="service-media">
                        {course.imageUrl ? (
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="service-image"
                          />
                        ) : (
                          <div className="service-image-placeholder" aria-hidden="true"></div>
                        )}
                      </div>
                      <div className="service-content">
                        <h4>{course.title}</h4>
                        <p>{course.summary}</p>
                        <div className="service-actions">
                          {course.slug ? (
                            <a className="button ghost" href={`/courses/${course.slug}`}>
                              Learn more
                            </a>
                          ) : (
                            <a className="button ghost" href="#contact">
                              Learn more
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="books" className="section books-section full-bleed">
        <div className="books-inner">
          <h2 className="section-title">Books</h2>
          <p className="section-lede">A portfolio of fiction and non-fiction rooted in place.</p>
          {recentBooks.length === 0 ? (
            <p className="card-text">Add books in Sanity to populate this list.</p>
          ) : (
            <div className="grid books-grid">
              {recentBooks.map((book) => (
                <article key={book.slug} className="card book-card">
                  <div className="book-cover">
                    <img
                      src={book.coverImageUrl || "/UnfitCover.png"}
                      alt={`${book.title} cover`}
                      className="book-card-image"
                    />
                  </div>
                  <h3 className="card-title">{book.title}</h3>
                  <p className="card-text">{book.blurb}</p>
                  <a className="button book-button" href={`/books/${book.slug}`}>
                    Read more
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="blog" className="section blog-section full-bleed">
        <div className="blog-inner">
          <div className="blog-header">
            <div>
              <p className="section-kicker">From the blog</p>
              <h2 className="section-title">Recent posts</h2>
              <p className="section-lede">Practical essays on craft, process, and publishing.</p>
            </div>
            <a className="button ghost" href="/blog">
              View all posts
            </a>
          </div>
          {posts.length === 0 ? (
            <p className="card-text">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid blog-grid">
              {posts.map((post) => (
                <article key={post.slug} className="card blog-card">
                  <p className="blog-date">{formatDate(post.publishedAt)}</p>
                  <h3 className="card-title">{post.title}</h3>
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

      <section id="contact" className="section full-bleed">
        <div className="newsletter-panel">
          <div className="newsletter-intro">
            <p className="section-kicker">Newsletter</p>
            <h2 className="section-title">Get the writing toolkit + monthly letters.</h2>
            <p className="section-lede">
              Craft notes, editing prompts, and new release updates. One email a month, no noise.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
