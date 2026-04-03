import { defineType, defineField } from "sanity"

export const dishType = defineType({
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Dish Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "image",
      title: "Dish Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Main Course", value: "Main Course" },
          { title: "Starters", value: "Starters" },
          { title: "Drinks", value: "Drinks" },
          { title: "Desserts", value: "Desserts" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "prepTime",
      title: "Prep Time (e.g. 15-20 MIN)",
      type: "string",
    }),
    defineField({
      name: "isAvailable",
      title: "Available",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isChefSpecial",
      title: "Chef's Special",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "badge",
      title: "Badge Label (e.g. BESTSELLER)",
      type: "string",
      description: "Optional. Leave empty for no badge.",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
})