"use server"
import { getMyToken } from "@/Utilities/getMyToken"

export default async function getLoggedUserWishlist() {
    const myToken = await getMyToken();
    if(!myToken){
        throw new Error("Please Login To Be Able To See Cart !!");
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "GET",
        headers: {
            token: myToken,
            "Content-Type": "application/json",
        }
    })
    const payload = await res.json();
  
    return payload ;
}
