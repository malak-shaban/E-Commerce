'use client'
import getLoggedUserCart from '@/CarActions/getUserCart.action'
import removeItemFromCart from '@/CarActions/removeCartItem.action';
import updateCartQuantity from '@/CarActions/updateCartQuantity.action';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import clearCartItem from '@/CarActions/clearCartItem.action';
import { CartContext } from '@/context/cartContext';
import { CartProductType } from '@/types/cart.type';
import Link from 'next/link';
import Image from 'next/image';


export default function Cart() {
  const [cartProducts, setcartProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false);
  const [updateDisable, setupdateDisable] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [cartId, setcartId] = useState("");
  const context = useContext(CartContext)
  if (!context) throw new Error("Not Exist")
  const { numOfCart, setnumOfCart } = context

  // const [token, settoken] = useState<string | undefined>("");
  // async function getTheToken() {
  //   let token = await getMyToken();
  //   settoken(token);
  //   console.log(token)
  // }
  // useEffect(()=>{
  //   getTheToken();
  // },[])

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      console.log(res)
      setcartId(res.cartId)
      if (res.status === "success") {
        setcartProducts(res.data.products);
        setisLoading(false);
        settotalCartPrice(res.data.totalCartPrice)

      }
    }
    catch (err) {
      console.log(err)
      toast.error('Failed to load cart. Please try again.', { position: "top-center" });
      setisLoading(false);
    }
  }
  useEffect(() => {
    getUserCart();
  }, []);

  if (isLoading) {
    return <div>
      <div className="flex justify-center items-center h-[90vh]">
        <div className="w-12 h-12 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>

    </div>
  }
  async function removeCartItem(id: string) {
    setremoveDisable(true);
    setupdateDisable(true);

    const res = await removeItemFromCart(id);
    console.log(res);
    if (res.status === "success") {
      getUserCart()
      setcartProducts(res.data.products);
      toast.success('Product Deleted Successfully.', { position: "top-center" });
      setremoveDisable(false);
      setupdateDisable(false);
      let sum = 0;
      res.data.products.forEach((product: CartProductType) => {
        sum += product.count
      });
      setnumOfCart(sum)

    }
    else {
      toast.error('Cannot Delete This Product Now!!', { position: "top-center" });
      setremoveDisable(false);
      setupdateDisable(false);


    }

  }
  async function updateQuantity(id: string, count: string, sign: string) {
    setupdateDisable(true)
    setloadingUpdate(true)
    setremoveDisable(true)
    setcurrentId(id)
    const res = await updateCartQuantity(id, count);
    console.log(res);
    if (res.status === "success") {
      setcartProducts(res.data.products)
      toast.success('Quantity Updated Successfully.', { position: "top-center" });
      if (sign === "-") {
        setnumOfCart(numOfCart - 1)
      }
      else if (sign === "+") {
        setnumOfCart(numOfCart + 1)
      }
      getUserCart()
      setupdateDisable(false)
      setloadingUpdate(false)
      setremoveDisable(false)

    }
    else {
      toast.error('Cannot Update The Quantity Now!!', { position: "top-center" });
      setupdateDisable(false)
      setloadingUpdate(false)
      setremoveDisable(false)

    }

  }
  async function clear() {
    const res = await clearCartItem()
    console.log(res);
    if (res.message === "success") {
      toast.success('Cart Cleared Successfully.', { position: "top-center" });
      setcartProducts([]);
    }
    else {
      toast.error('Cannot Clear Cart Now!!', { position: "top-center" });
    }

  }


  return (
    <>

      {cartProducts.length > 0 ? (
        <div className="w-[80%] mx-auto my-12 font-serif">
          <h2 className='text-2xl text-center my-5 font-bold font-serif'>My Cart</h2>
          <span className='p-2 lg:p-5 md:p-3 border-[1px] rounded-lg border-gray-800 text-center '><strong>Total Price :<span className='text-green-800 pr-2'> {totalCartPrice}</span></strong>EGP</span>
          <div className="flex justify-end">
            <Button onClick={() => clear()} className='cursor-pointer my-5 ' >Clear Cart Items</Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span>Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Qty</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts?.map((product: CartProductType) => <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <Image
                      src={product.product.imageCover}
                      alt={product.product.title}
                      width={128}
                      height={128}
                      className="w-16 md:w-32 max-w-full max-h-full"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        disabled={updateDisable}
                        onClick={() => { updateQuantity(product.product.id, `${product.count - 1}`, "-") }}
                        className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white disabled:bg-gray-500 disabled:text-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        {product.product.id === currentId ? (loadingUpdate ?
                          <i className='fas fa-spinner fa-spin'></i>
                          :
                          <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{product.count}</span>
                        ) : (
                          <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{product.count}</span>
                        )}
                      </div>
                      <button
                        disabled={updateDisable}
                        onClick={() => { updateQuantity(product.product.id, `${product.count + 1}`, "+") }}
                        className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border disabled:bg-gray-500 disabled:text-white border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price * product.count}EGP</td>
                  <td className="px-6 py-4">
                    <button
                      disabled={removeDisable}
                      onClick={() => { removeCartItem(product.product.id) }}
                      className="font-medium text-red-600 dark:text-red-500 cursor-pointer disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white">
                      Remove</button>
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className='my-5'>
            <Link href={`/checkout/${cartId}`}>
              <Button className='bg-green-700 text-white w-full cursor-pointer p-5 hover:bg-green-900'>Checkout Now</Button>
            </Link>

          </div>
          <div className='my-5'>
            <Link href={`/cachOrder/${cartId}`}>
              <Button className='bg-green-700 text-white w-full cursor-pointer p-5 hover:bg-green-900'>Cash on delivery</Button>
            </Link>
          </div>

        </div>
      )
        :
        <div className="flex justify-center items-center h-[90vh] ">
          <h1 className='font-bold font-serif text-2xl text-red-700'>No Products Added Yet !!</h1>
        </div>
      }


    </>
  )
}
