import { client, urlFor } from "./client"
import { Dish } from "@/types"

interface SanityDish {
  _id: string
  name: string
  price: number
  image: { asset: { _ref: string } }
  category: string
  ingredients: string[]
  description: string
  prepTime: string
  isAvailable: boolean
  isChefSpecial?: boolean
  badge?: string
}

function mapDish(raw: SanityDish): Dish {
  return {
    id: raw._id,
    name: raw.name,
    price: raw.price,
    image: urlFor(raw.image).width(800).url(),
    category: raw.category as Dish["category"],
    ingredients: raw.ingredients ?? [],
    description: raw.description,
    prepTime: raw.prepTime,
    isAvailable: raw.isAvailable,
    isChefSpecial: raw.isChefSpecial,
    badge: raw.badge,
  }
}

export async function getAllDishes(): Promise<Dish[]> {
  const query = `*[_type == "dish" && isAvailable == true] | order(_createdAt desc) {
    _id, name, price, image, category, ingredients,
    description, prepTime, isAvailable, isChefSpecial, badge
  }`
  const raw: SanityDish[] = await client.fetch(query)
  return raw.map(mapDish)
}

export async function getFeaturedDishes(): Promise<Dish[]> {
  const query = `*[_type == "dish" && isAvailable == true] | order(_createdAt desc)[0...3] {
    _id, name, price, image, category, ingredients,
    description, prepTime, isAvailable, isChefSpecial, badge
  }`
  const raw: SanityDish[] = await client.fetch(query)
  return raw.map(mapDish)
}

export async function getDishById(id: string): Promise<Dish | null> {
  const query = `*[_type == "dish" && _id == $id][0] {
    _id, name, price, image, category, ingredients,
    description, prepTime, isAvailable, isChefSpecial, badge
  }`
  const raw: SanityDish | null = await client.fetch(query, { id })
  if (!raw) return null
  return mapDish(raw)
}
