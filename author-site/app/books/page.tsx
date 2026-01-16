import { sanityClient } from "@/lib/sanity";

export const revalidate = 60;

type Series = {
  _id: string;
  title: string;
  description?: string;
  order?: number;
};

type Book = {
  title: string;
  slug: string;
  blurb?: string;
  coverImageUrl?: string;
  series?: Series;
  seriesOrder?: number;
};

async function getSeries(): Promise<Series[]> {
  return sanityClient.fetch(
    `*[_type == "series"] | order(order asc, title asc) {
      _id,
      title,
      description,
      order
    }`
  );
}

async function getBooks(): Promise<Book[]> {
  return sanityClient.fetch(
    `*[_type == "book"] | order(series->order asc, seriesOrder asc, order asc, title asc) {
      title,
      "slug": slug.current,
      blurb,
      "coverImageUrl": coverImage.asset->url,
      series->{_id, title, description},
      seriesOrder
    }`
  );
}

export default async function BooksPage() {
  const [seriesList, books] = await Promise.all([getSeries(), getBooks()]);

  const seriesMap = new Map<string, Book[]>();
  const standalone: Book[] = [];

  books.forEach((book) => {
    if (book.series?._id) {
      const entry = seriesMap.get(book.series._id) || [];
      entry.push(book);
      seriesMap.set(book.series._id, entry);
    } else {
      standalone.push(book);
    }
  });

  return (
    <section className="section books-page full-bleed">
      <div className="books-page-inner">
        <p className="section-kicker">Books</p>
        <h1 className="section-title">Seven psychological thrillers rooted in obsession.</h1>
        <p className="section-lede">
          Explore a collection of atmospheric suspense novels, each driven by secrets, layered
          timelines, and sharp emotional stakes.
        </p>
        {books.length === 0 ? (
          <p className="card-text">Add books in Sanity to build your catalog.</p>
        ) : (
          <div className="books-series">
            {seriesList.map((series) => {
              const seriesBooks = seriesMap.get(series._id) || [];
              if (seriesBooks.length === 0) {
                return null;
              }
              return (
                <div key={series._id} className="series-group">
                  <div className="series-header">
                    <h2 className="series-title">{series.title}</h2>
                    <p className="series-note">{series.description}</p>
                  </div>
                  <div className="grid books-grid series-grid">
                    {seriesBooks.map((book) => (
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
                </div>
              );
            })}

            {standalone.length > 0 ? (
              <div className="series-group">
                <div className="series-header">
                  <h2 className="series-title">Stand-alone novels</h2>
                  <p className="series-note">Psychological thrillers built as one-and-done journeys.</p>
                </div>
                <div className="grid books-grid series-grid">
                  {standalone.map((book) => (
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
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
