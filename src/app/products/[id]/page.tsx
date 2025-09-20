import { productType } from '@/types/product.type';
import Image from 'next/image';
import React from 'react'
import Addbtn from '@/app/_Component/AddBtn/Addbtn';
import getRelatedProducts from '@/ProductCategoryActions/relatedProducts.action';
import SingleProduct from '@/app/_Component/SingleProduct/SingleProduct';


export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id)
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const { data }: { data: productType } = await res.json();

    console.log(data);
    // data.category._id ===> category id ==> current product
    if (!data) {
        return (<div className='flex justify-center items-center w-full'>
            <h2 className='text-2xl font-bold font-serif'>No Products Here</h2>
        </div>
        )
    }
    const relatedProducts = await getRelatedProducts(data.category._id)
    console.log(relatedProducts);


    return (
        <div className='mx-5 font-serif'>
            <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center my-5 gap-6">
                <div className="w-full md:w-1/4">
                    <Image className='w-full rounded-lg' src={data.imageCover} alt="product" width={500} height={500} />
                </div>
                <div className="w-full md:w-3/4">
                    <h1 className='text-2xl md:text-3xl font-bold my-3'>{data.title}</h1>
                    <p className='my-2'>{data.description}</p>
                    <p className='text-emerald-800 my-2'>{data.category.name}</p>
                    <div className="flex justify-between my-3">
                        <span className='text-lg font-semibold'>{data.price} EGP</span>
                        <span className='flex items-center gap-1'>
                            {data.ratingsAverage} <i className='fas fa-star text-yellow-400'></i>
                        </span>
                    </div>
                    <Addbtn id={data.id} />
                </div>
            </div>

            <div>
                <div className='flex justify-center items-center w-full mt-10'>
                    <span className='text-2xl font-bold font-serif mb-5 border-[2px] p-2 rounded-lg '>Related Products</span>
                </div>
                <div className="container w-[80%] mx-auto my-5">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                        {relatedProducts.data.map((currentProduct: productType) => (
                            <SingleProduct key={currentProduct.id} product={currentProduct} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
