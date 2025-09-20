"use client"
import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { AddToCart } from '@/CarActions/addToCart.actions'
import { toast } from 'sonner'
import { CartContext } from '@/context/cartContext'

export default function Addbtn({ id }: { id: string }) {

  const context = useContext(CartContext)
  if (!context) throw new Error("Not Exist")
  const { numOfCart, setnumOfCart } = context
  async function checkAddProduct(id: string) {
    const res = await AddToCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Product Added Successfully", { position: "top-center" });
      setnumOfCart(numOfCart + 1)
    }
    else {
      toast.error(res.message, { position: "top-center" });

    }
  }
  return (
    <>
      <Button onClick={() => { checkAddProduct(id) }} className=' mt-3 cursor-pointer w-full'>Add To Cart</Button>
    </>
  )
}
