import { sanityClient } from "@/lib/sanity";

export const revalidate = 60;

type Service = {
  title: string;
  slug: string;
  summary?: string;
  body?: Array<{ _type?: string; children?: Array<{ text?: string }> }>;
  imageUrl?: string;
};

type Course = {
  title: string;
  slug: string;
  summary?: string;
  body?: Array<{ _type?: string; children?: Array<{ text?: string }> }>;
  syllabus?: string[];
  highlights?: Array<{ label?: string; value?: string }>;
  imageUrl?: string;
};

function getPreviewText(
  body?: Array<{ _type?: string; children?: Array<{ text?: string }> }>
) {
  const firstBlock = body?.find((block) => block?._type === "block");
  const text = firstBlock?.children?.map((child) => child?.text || "").join(" ").trim();
  if (!text) {
    return "";
  }
  return text.length > 140 ? `${text.slice(0, 137)}...` : text;
}

async function getServices(): Promise<Service[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc, title asc) {
      title,
      "slug": slug.current,
      summary,
      body,
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
      body,
      syllabus,
      highlights,
      "imageUrl": image.asset->url
    }`
  );
}

export default async function ServicesIndexPage() {
  const [services, courses] = await Promise.all([getServices(), getCourses()]);

  return (
    <section className="section services-index full-bleed">
      <div className="services-index-inner">
        <p className="section-kicker">Services & Courses</p>
        <h1 className="section-title">Support for every stage of the draft.</h1>
        <p className="section-lede">
          Browse editorial services and courses with more detail, outcomes, and next steps.
        </p>

        <div className="services-index-group">
          <div className="services-index-header">
            <h2>Editing services</h2>
            <p>High-touch feedback and strategy tailored to your manuscript.</p>
          </div>
          {services.length === 0 ? (
            <p className="card-text">Add services in Sanity to populate this list.</p>
          ) : (
            <div className="services-index-list">
              {services.map((service) => {
                const preview = getPreviewText(service.body);
                return (
                  <article key={service.slug} className="service-entry">
                    <div className="entry-media">
                      {service.imageUrl ? (
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="entry-image"
                        />
                      ) : (
                        <div className="entry-image-placeholder" aria-hidden="true"></div>
                      )}
                    </div>
                    <div className="entry-body">
                      <div className="entry-tag">
                        <span className="entry-icon" aria-hidden="true">
                          ✦
                        </span>
                        <span>Service</span>
                      </div>
                      <h3>{service.title}</h3>
                      <p className="entry-summary">{service.summary}</p>
                      {preview ? <p className="entry-detail">{preview}</p> : null}
                      <a className="link-arrow" href={`/services/${service.slug}`}>
                        Learn more
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <div className="services-index-group">
          <div className="services-index-header">
            <h2>Courses</h2>
            <p>Guided programs with structure, accountability, and tools.</p>
          </div>
          {courses.length === 0 ? (
            <p className="card-text">Add courses in Sanity to populate this list.</p>
          ) : (
            <div className="services-index-list">
              {courses.map((course) => {
                const preview = getPreviewText(course.body);
                return (
                  <article key={course.slug} className="service-entry">
                    <div className="entry-media">
                      {course.imageUrl ? (
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="entry-image"
                        />
                      ) : (
                        <div className="entry-image-placeholder" aria-hidden="true"></div>
                      )}
                    </div>
                    <div className="entry-body">
                      <div className="entry-tag">
                        <span className="entry-icon alt" aria-hidden="true">
                          ○
                        </span>
                        <span>Course</span>
                      </div>
                      <h3>{course.title}</h3>
                      <p className="entry-summary">{course.summary}</p>
                      {preview ? <p className="entry-detail">{preview}</p> : null}
                      {course.syllabus?.length ? (
                        <ul className="entry-list">
                          {course.syllabus.slice(0, 2).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      <a className="link-arrow" href={`/courses/${course.slug}`}>
                        Learn more
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
