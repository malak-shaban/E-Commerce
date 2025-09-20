"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation';
import { checkoutSchema, checkoutSchemaType } from '@/schema/checkout.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import onlinePayment from '@/CheckoutActions/onlineCheckout.action';


export default function Checkout() {
  const { id }: { id: string } = useParams();
  console.log(id);

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });
  async function handleCheckout(value: checkoutSchemaType) {
    console.log(value);
    const res = await onlinePayment( id  ,"" , value);
    console.log(res);
    if(res.status === "success"){
      // console.log(res.session.url);
      window.location.href = res.session.url ;
      
    }
    

  }
  return (
    <>
      <div className="w-[50%] mx-auto my-12 p-5 border-2 rounded-lg shadow-2xl">
        <h1 className='text-3xl text-center my-5 font-bold'>Checkout Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCheckout)}>

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details:</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input type='tel' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City:</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-4 cursor-pointer w-full'>Pay Now</Button>
          </form>
        </Form>

      </div>


    </>
  )
}