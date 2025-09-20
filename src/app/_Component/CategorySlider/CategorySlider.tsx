import getAllCategories from '@/api/allCategories';
import React from 'react'
import CategorySwiper from './CategorySwiper/CategorySwiper';


export default async function CategorySlider() {
    const data = await getAllCategories();
    // console.log(data);
    
  return (
    <div >
        <CategorySwiper data={data}/>
    </div>
  )
}
