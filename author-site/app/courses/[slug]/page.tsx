import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity";

export const revalidate = 60;

const COURSE_QUERY = `*[_type == "course" && slug.current == $slug][0] {
  title,
  summary,
  body,
  syllabus,
  highlights,
  ctaLabel,
  ctaUrl
}`;

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await sanityClient.fetch(COURSE_QUERY, { slug });

  if (!course) {
    notFound();
  }

  return (
    <section className="section course-page full-bleed">
      <div className="course-page-inner">
        <p className="section-kicker">Course</p>
        <h1 className="section-title">{course.title as string}</h1>
        <p className="section-lede">{course.summary as string}</p>
        <div className="course-layout">
          <div className="course-details">
            <h2>What you will learn</h2>
            {Array.isArray(course.body) ? <PortableText value={course.body} /> : null}
            {Array.isArray(course.syllabus) && course.syllabus.length ? (
              <div className="syllabus">
                <h3>Syllabus</h3>
                <ul>
                  {(course.syllabus as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {Array.isArray(course.highlights) && course.highlights.length ? (
              <div className="course-highlights">
                {course.highlights.map((highlight, index) => (
                  <div key={`${highlight.label}-${index}`}>
                    <p className="highlight-label">{highlight.label}</p>
                    <p className="highlight-value">{highlight.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="course-signup card">
            <h3>Ready to enroll?</h3>
            <p className="card-text">
              Save your spot and get the onboarding guide plus immediate access.
            </p>
            <a className="button" href={(course.ctaUrl as string) || "#contact"}>
              {(course.ctaLabel as string) || "Join the course"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
