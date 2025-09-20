import getSingleSubCategory from "@/api/getSingleSubCategory";
import { SubCategoryType } from "@/types/subCategory.type";

export default async function SubCategoryPage({ params }: { params: { id: string } }) {
  const subCategory: SubCategoryType = await getSingleSubCategory(params.id);

  return (
    <div className="w-[80%] mx-auto my-10 p-6 font-serif">
      <h1 className="text-3xl font-bold text-green-700 mb-6">{subCategory.name}</h1>

      <div className="border rounded-lg p-6 shadow-lg">
        <p className="text-lg text-gray-700">
          <span className="font-bold">Slug:</span> {subCategory.slug}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Category ID:</span> {subCategory.category}
        </p>
        <p className="text-sm text-gray-500">
          Created: {new Date(subCategory.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          Updated: {new Date(subCategory.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
