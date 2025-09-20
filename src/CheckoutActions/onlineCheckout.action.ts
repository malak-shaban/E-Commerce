"use server"
import { cachSchemaType } from "@/schema/cachOrde.schema";
import { getMyToken } from "@/Utilities/getMyToken"

export default async function onlinePayment(
    cartId:string ,
     url = process.env.NEXT_URL, 
     formValues:cachSchemaType
    ) {
    const token = await getMyToken();
    if(!token){
        throw new Error (`login frist`)
    }
   const res =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
    method: "POST",
    headers:{
        token,
        "Content-Type":"application/json"
    },
    body: JSON.stringify({shippingAddress: formValues})

    })
    const payload = await res.json();
    return payload
}