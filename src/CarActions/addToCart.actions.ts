"use server"

import { getMyToken } from "@/Utilities/getMyToken"
export async function AddToCart(id: string) {

 try{
       const token = await getMyToken();
    if (!token) {
         throw new Error("not authorize to add product");
        
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "POST",
        headers: {
            token: token ,
            "Content-Type":"application/json",
        },
        body: JSON.stringify({productId: id})
        
    });
    const data = await res.json();
    return data ; 
 }
 catch(err){
    return err
 }
}