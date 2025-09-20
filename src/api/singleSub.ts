import { SubCategoryType } from "@/types/subCategory.type";

export default async function getSingleSubCategory(id: string): Promise<SubCategoryType> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch subcategory");
  const data = await res.json();
  return data.data;
}
