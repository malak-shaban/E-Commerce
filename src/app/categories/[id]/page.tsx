import getRelatedCat from "@/ProductCategoryActions/relatedCategory/relatedCategory";
import { SubCategoryType } from "@/types/subCategory.type";
type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

async function getCategory(id: string): Promise<CategoryType> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  const { data } = await res.json();
  return data;
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id);
  const subCategories: SubCategoryType[] = await getRelatedCat(params.id);

  return (
    <div className="w-[80%] mx-auto my-10 p-6 font-serif">
      <div className="mb-10 flex items-center gap-6 border-b pb-6">
        {category.image && (
          <img
            src={category.image}
            alt={category.name}
            className="w-28 h-28 object-contain rounded-lg shadow"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-green-700">{category.name}</h1>
          <p className="text-gray-600">Slug: {category.slug}</p>
          <p className="text-xs text-gray-500">
            Created: {new Date(category.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-boldfont-serif mb-4">SubCategories</h2>
      {subCategories.length === 0 ? (
        <p className="text-gray-600">No subcategories found for this category.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="font-bold text-lg text-green-700">{sub.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Slug: {sub.slug}</p>
              <p className="text-xs text-gray-500">
                Created: {new Date(sub.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
