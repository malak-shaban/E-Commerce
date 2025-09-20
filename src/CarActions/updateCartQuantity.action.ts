"use server"

import { getMyToken } from "@/Utilities/getMyToken"

export default async function updateCartQuantity(id: string , count:string) {
    const myToken = await getMyToken();
    if(!myToken){
        throw new Error("Please Login First")
    }
    const res =await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: "PUT",
         headers:{
            token: myToken ,
           "Content-Type":"application/json",
        }, 
        body: JSON.stringify({count: count})
    });
    const payload = await res.json();
    return payload ;

}
