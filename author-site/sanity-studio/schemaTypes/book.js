export default {
  name: "book",
  title: "Book",
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
      name: "blurb",
      title: "Blurb",
      type: "text",
      rows: 3,
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "series" }],
    },
    {
      name: "seriesOrder",
      title: "Series order",
      type: "number",
      description: "Order within the series",
      initialValue: 1,
    },
    {
      name: "order",
      title: "Overall order",
      type: "number",
      initialValue: 0,
    },
    {
      name: "purchaseUrl",
      title: "Purchase URL",
      type: "url",
    },
    {
      name: "body",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
};
