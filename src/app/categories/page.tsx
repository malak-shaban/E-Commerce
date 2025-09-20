import getAllCategories from '@/api/allCategories'
import { categoryType } from '@/types/category.type';
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { SubCategoryType } from '@/types/subCategory.type';
import getAllSubCategories from '@/api/allSubCat';

export default async function AllCategories() {
  const categories: categoryType[] = await getAllCategories()
  const subCategories: SubCategoryType[] = await getAllSubCategories()

  return (
    <div className='w-[80%] mx-auto my-4  p-2 font-serif'>
      {/* ================== All Categories ================== */}
      <h2 className='text-2xl text-center my-5 font-bold font-serif'>Shop All Categories</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 mb-10">
        {categories.map((category) => (
          <Card className='gap-1 cursor-pointer' key={category._id}>
            <Link href={`/categories/${category._id}`} className='h-full'>
              <CardHeader>
                {category.image && (
                  <CardTitle>
                    <Image 
                      src={category.image} 
                      alt={category.name} 
                      width={500} 
                      height={500} 
                    />
                  </CardTitle>
                )}
                <CardDescription className='text-green-800'>
                  {category.name}
                </CardDescription>
              </CardHeader>
              <CardContent className='font-bold text-sm tracking-normal'>
                <p className='line-clamp-2'>{category.slug}</p>
              </CardContent>
              <CardFooter>
                <p>{new Date(category.createdAt).toLocaleDateString()}</p>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>

      {/* ================== All SubCategories ================== */}
      <h2 className='text-2xl text-center my-5 font-bold font-serif'>All SubCategories</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
        {subCategories.map((sub) => (
          <Card className='gap-1 cursor-pointer' key={sub._id}>
            <Link href={`/subcategories/${sub._id}`} className='h-full'>
              <CardHeader>
                <CardDescription className='text-green-800'>
                  {sub.name}
                </CardDescription>
              </CardHeader>
              <CardContent className='font-bold text-sm tracking-normal'>
                <p className='line-clamp-2'>{sub.slug}</p>
              </CardContent>
              <CardFooter>
                <p>{new Date(sub.createdAt).toLocaleDateString()}</p>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
