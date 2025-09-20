import allProducts from '@/api/products.api';
import React from 'react'
import SingleProduct from '../SingleProduct/SingleProduct';
import { productType } from '../../../types/product.type';

export default async function AllProducts() {
  const data = await allProducts();
  return (
    <div>
           <div className="container w-[80%] mx-auto my-5 font-serif">
            <h2 className='text-2xl text-center my-5 font-bold font-serif'>All Products</h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                  {data.map((currentProduct:productType) => (
                    <SingleProduct key={currentProduct.id} product={currentProduct} />
                    ))}
                </div>
              </div>
    </div>
  )
}
