"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import getLoggedUserWishlist from "@/wishlistActions/getUserWishlist.action"
import removeItemFromWish from "@/wishlistActions/removeW.action"
import { toast } from "sonner"
import { WishlistItem } from "@/types/WishlistItem.type"


export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const res = await getLoggedUserWishlist()
                if (res?.status === "success") {
                    setWishlist(res.data)
                }
            } catch (err) {
                console.error("Wishlist fetch error", err)
            } finally {
                setLoading(false)
            }
        }
        fetchWishlist()
    }, [])

    async function handleRemove(id: string) {
        try {
            const res = await removeItemFromWish(id)
            if (res.status === "success") {
                toast.success("Removed from wishlist", { position: "top-center" })
                setWishlist((prev) => prev.filter((item) => item._id !== id))
            } else {
                toast.error("Failed to remove", { position: "top-center" })
            }
        } catch{
            toast.error("Something went wrong", { position: "top-center" })
        }
    }
    if (loading) {
        return (
            <div>
                <div className="flex justify-center items-center h-[90vh]">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            </div>
        )
    }
    return (
        <>
            {wishlist.length > 0 ? (
                <div className="w-2/3 mx-auto my-12">
                    <h2 className='text-2xl text-center my-5 font-bold font-serif'>Wishlist</h2>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span>Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">Product</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="p-4">
                                            <Image
                                                src={product.imageCover}
                                                alt={product.title}
                                                width={128}
                                                height={128}
                                                className="w-16 md:w-32 max-w-full max-h-full"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product.title}
                                        </td>
                                        <td className="px-6 py-4">{product.category?.name}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product.price} EGP
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleRemove(product._id)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[90vh]">
                    <h1 className="font-bold font-serif text-2xl text-red-700">
                        No Products Added Yet !!
                    </h1>
                </div>
            )}
        </>
    )
}



