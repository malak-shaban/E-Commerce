// "use server"
// export default async function getRelatedCat(catId : string) {
//  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`)
//  const payload = await res.json();
//  return payload
// }
"use server";

import { SubCategoryType } from "@/types/subCategory.type";

export default async function getRelatedCat(catId: string): Promise<SubCategoryType[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch related categories");

  const payload = await res.json();
  return Array.isArray(payload.data) ? payload.data : [];
}

