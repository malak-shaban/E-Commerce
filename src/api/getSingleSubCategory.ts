"use server";
export default async function getSingleSubCategory(id: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
  const { data } = await res.json();
  return data;
}
