import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity";

export const revalidate = 60;

const BOOK_QUERY = `*[_type == "book" && slug.current == $slug][0] {
  title,
  blurb,
  "coverImageUrl": coverImage.asset->url,
  "seriesTitle": series->title,
  purchaseUrl,
  body
}`;

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = await sanityClient.fetch(BOOK_QUERY, { slug });

  if (!book) {
    notFound();
  }

  return (
    <section className="section book-detail full-bleed">
      <div className="book-detail-inner">
        <div className="book-detail-header">
          <div className="book-detail-cover">
            <img
              src={(book.coverImageUrl as string) || "/UnfitCover.png"}
              alt={`${book.title as string} cover`}
              className="book-card-image"
            />
          </div>
          <div className="book-detail-copy">
            <p className="section-kicker">Book</p>
            <h1 className="section-title">{book.title as string}</h1>
            {book.seriesTitle ? (
              <p className="book-detail-series">Series: {book.seriesTitle as string}</p>
            ) : null}
            <p className="section-lede">{book.blurb as string}</p>
            <a className="button" href={(book.purchaseUrl as string) || "#contact"}>
              Buy the book
            </a>
          </div>
        </div>
        {Array.isArray(book.body) ? (
          <div className="book-detail-body">
            <PortableText value={book.body} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
