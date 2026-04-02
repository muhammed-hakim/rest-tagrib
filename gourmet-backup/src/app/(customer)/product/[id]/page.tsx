import { notFound } from "next/navigation"
import { getDishById } from "@/sanity/queries"
import ProductClient from "./ProductClient"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dish = await getDishById(id)
  if (!dish) return notFound()
  return <ProductClient dish={dish} />
}
