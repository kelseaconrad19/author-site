export default {
  name: "series",
  title: "Series",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    },
  ],
};
