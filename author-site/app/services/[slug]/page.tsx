import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity";
export const revalidate = 60;

const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0] {
  title,
  summary,
  body,
  ctaLabel,
  ctaUrl
}`;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }
  const service = await sanityClient.fetch(SERVICE_QUERY, { slug });

  if (!service) {
    notFound();
  }

  return (
    <section className="section service-page full-bleed">
      <div className="service-page-inner">
        <p className="section-kicker">Editing service</p>
        <h1 className="section-title">{service.title as string}</h1>
        <p className="section-lede">{service.summary as string}</p>
        <div className="service-layout">
          <div className="service-details">
            <h2>What you can expect</h2>
            {Array.isArray(service.body) ? <PortableText value={service.body} /> : null}
          </div>
          <div className="service-signup card">
            <h3>Ready to start?</h3>
            <p className="card-text">
              Share your manuscript details and I’ll confirm fit, timing, and next steps.
            </p>
            <a className="button" href={(service.ctaUrl as string) || "#contact"}>
              {(service.ctaLabel as string) || "Apply for this service"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
