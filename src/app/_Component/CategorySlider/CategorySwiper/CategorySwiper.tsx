"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules'
import Image from 'next/image';
import { categoryType } from '../../../../types/category.type';

export default function CategorySwiper({ data }: { data: categoryType[] }) {
  console.log(data);
  return (
    <div className='w-[80%] mx-auto my-4 font-serif p-2'>
      <h2 className='my-3 text-2xl text-gray-700'>Shop Popular Categories</h2>
      <div className="flex">

        <Swiper
          spaceBetween={0}
          slidesPerView={2}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 7 }
          }}
        >
          {data.map((category: categoryType) => (
            <SwiperSlide key={category._id}>
              <Image src={category.image} alt='photo' width={500} height={500} className='w-full h-[150px] object-cover' />
              <p className='font-bold pt-2'>{category.name}</p>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>


  )
}
