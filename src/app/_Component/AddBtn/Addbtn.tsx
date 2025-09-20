"use client"
import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { AddToCart } from '@/CarActions/addToCart.actions'
import { toast } from 'sonner'
import { CartContext } from '@/context/cartContext'

export default function Addbtn({ id }: { id: string }) {
  const context = useContext(CartContext)
  if (!context) throw new Error("not exit")
  const { numOfCart, setnumOfCart } = context

  const [loading, setLoading] = useState(false)

  async function checkAddProduct(id: string) {
    try {
      setLoading(true)
      const res = await AddToCart(id);
      console.log(res);

      if (res.status === "success") {
        toast.success("Product Added Successfully", { position: "top-center" });
        setnumOfCart(numOfCart + 1)
      } else {
        toast.error(res.message || "Something went wrong", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Server error", { position: "top-center" });
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={loading}
      onClick={() => checkAddProduct(id)}
      className="mt-3 cursor-pointer w-full"
    >
      {loading ? <i className="fa-solid fa-spinner"></i> : "Add To Cart"}
    </Button>
  )
}

