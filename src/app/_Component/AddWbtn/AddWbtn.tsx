"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AddToWishlist } from '@/wishlistActions/addToWishlist.action'
import removeItemFromWish from '@/wishlistActions/removeW.action'
import getLoggedUserWishlist from '@/wishlistActions/getUserWishlist.action'
import { WishlistProduct, WishlistResponse } from '@/types/wishlist.type'


export default function Heartbtn({ id }: { id: string }) {
    const [wish, setWish] = useState(false)

    async function getUserCart(): Promise<WishlistResponse> {
        const res = await getLoggedUserWishlist()
        console.log(res)
        return res as WishlistResponse
    }

    useEffect(() => {
        async function checkInitial() {
            try {
                const res = await getUserCart()
                if (res?.data) {
                    const found: WishlistProduct | undefined = res.data.find(
                        (item) => item._id === id
                    )
                    if (found) {
                        setWish(true)
                    }
                }
            } catch (err) {
                console.error("Wishlist fetch error:", err)
            }
        }
        checkInitial()
    }, [id])


    async function toggleWish(id: string) {
        try {
            if (!wish) {
                const res = await AddToWishlist(id)
                if (res.status === "success") {
                    toast.success(res.message, { position: "top-center" })
                    setWish(true)
                } else {
                    toast.error(res.message, { position: "top-center" })
                }
            }
            else {
                const res = await removeItemFromWish(id)
                if (res.status === "success") {
                    toast.success("Removed from wishlist", { position: "top-center" })
                    setWish(false)
                } else {
                    toast.error("Failed to remove", { position: "top-center" })
                }
            }
        } catch {
            toast.error("Something went wrong", { position: "top-center" })
        }
    }

    return (
        <div
            onClick={() => toggleWish(id)}
            className="absolute top-2 right-2 z-50 bg-white p-2 rounded-full shadow cursor-pointer"
        >
            {wish ? (
                <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
            ) : (
                <i className="fa-regular fa-heart"></i>
            )}
        </div>
    )
}