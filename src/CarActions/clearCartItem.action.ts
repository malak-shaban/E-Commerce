"use server"
import { getMyToken } from "@/Utilities/getMyToken"

export default async function clearCartItem() {
   const myToken = await getMyToken();
    if(!myToken){
        throw new Error("Please Login First")
    }
    const res =await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "DELETE",
         headers:{
            token: myToken ,
           "Content-Type":"application/json",
        }, 
    });
    const payload = await res.json();
    return payload ;

}
