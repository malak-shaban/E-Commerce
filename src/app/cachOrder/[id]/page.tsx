"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { cachSchema, cachSchemaType } from '@/schema/cachOrde.schema';
import CachPayment from '@/CheckoutActions/cath.action';
import { toast } from 'sonner';

export default function Checkout() {
  const router = useRouter()
  const { id }: { id: string } = useParams();
  console.log(id);

  const form = useForm<cachSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(cachSchema),
  });
  async function handleCach(value: cachSchemaType) {
    console.log(value);


    try {
      const res = await CachPayment(id, value);
      console.log(res);
      if (res.status === "success") {
        toast.success("The order has been booked", { position: "top-center" })
        router.push("/")
      }
      else if (res.statusMsg === "fail") {
        toast.error(res.message, { position: "top-center" })
      }
      else {
        toast.error("Error", { position: "top-center" })
      }

    } catch {
      toast.error("Error", { position: "top-center" })
    }
  }




  return (
    <>
      <div className="w-[80%] mx-auto my-12 p-5 border-2 rounded-lg shadow-2xl font-serif">
        <h1 className='text-3xl text-center my-5 font-bold'>Enter Data Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCach)}>

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
            <Button className='mt-4 cursor-pointer w-full '>send</Button>
          </form>
        </Form>

      </div>


    </>
  )
}