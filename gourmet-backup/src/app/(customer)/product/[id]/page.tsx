import { notFound } from "next/navigation"
import { getDishById } from "@/sanity/queries"
import ProductClient from "./ProductClient"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const dish = await getDishById(params.id)
  if (!dish) return notFound()
  return <ProductClient dish={dish} />
}
