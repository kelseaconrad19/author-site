export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "body",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      initialValue: "Apply for this service",
    },
    {
      name: "ctaUrl",
      title: "CTA URL",
      type: "url",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
