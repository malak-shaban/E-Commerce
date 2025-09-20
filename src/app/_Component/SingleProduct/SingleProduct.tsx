
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from 'next/link'
import { productType } from '../../../types/product.type'
import Addbtn from '../AddBtn/Addbtn'
import Image from 'next/image'
import Heartbtn from '../AddWbtn/AddWbtn'

export default function SingleProduct({ product }: { product: productType }) {
  return (
    <>
      <Card className='gap-1 relative'>
        <div >
         <Heartbtn id={product.id}/>
        </div>
        <Link href={`/products/${product.id}`}>
          <CardHeader>
            <CardTitle><Image src={product.imageCover} alt={"product image"} width={500} height={500} /></CardTitle>
            <CardDescription className='text-green-800'>{product.category.name}</CardDescription>
          </CardHeader>
          <CardContent className='font-bold text-sm tracking-normal'>
            <p className='line-clamp-2'>{product.title}</p>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <span>{product.price}EGP</span>
              <span>{product.ratingsAverage}<i className='fas fa-star text-yellow-300'></i></span>
            </div>
          </CardFooter>
        </Link>

        <div className='w-full px-2'><Addbtn id={product.id} /></div>

      </Card>

    </>
  )
}
