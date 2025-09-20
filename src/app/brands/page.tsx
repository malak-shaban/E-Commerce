import { BrandType } from '@/types/brandType.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Brands() {
  const res = fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await (await res).json();
  console.log(data);
  const brands: BrandType[] = data.data;

  return (
    <>
      <div className="w-[90%] mx-auto my-10 font-serif">
        <h2 className='text-2xl text-center my-5 font-bold font-serif'> Our Brands</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 font-serif">
          {brands.map((brand) => (
            <Link
              href={`/brands/${brand._id}`}
              key={brand._id}
              className="block"
            >
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center font-serif">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={120}
                  className="object-contain h-24 mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {brand.name}
                </h2>
                <p className="text-xs text-gray-400">Slug: {brand.slug}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </>
  )
}
