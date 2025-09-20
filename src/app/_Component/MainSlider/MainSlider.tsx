"use client"
import React from 'react'
import img1 from '../../../../src/assets/images/slider-image-1.jpeg'
import img2 from '../../../../src/assets/images/slider-image-2.jpeg'
import img3 from '../../../../src/assets/images/slider-image-3.jpeg'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules'


export default function MainSlider() {
  return (
    <>
    <div className='w-[80%] mx-auto my-4 flex'>
      <div className="w-3/4">
       <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{delay:2000}}
     
    >
      <SwiperSlide> <Image src={img1} alt='photo' className='w-full h-[400px] object-cover' loading="eager" priority/></SwiperSlide>
      <SwiperSlide> <Image src={img2} alt='photo' className='w-full h-[400px] object-cover' loading="eager" priority /></SwiperSlide>
      <SwiperSlide> <Image src={img3} alt='photo' className='w-full h-[400px] object-cover' loading="eager" priority /></SwiperSlide>
    </Swiper>
      </div>
      <div className="w-1/4 flex flex-col">
      <Image src={img2} alt='photo' className='w-full h-[200px] object-cover' loading="eager" priority />
      <Image src={img3} alt='photo' className='w-full h-[200px] object-cover' loading="eager" priority />
      </div>
    </div>



    </>
  )
}
