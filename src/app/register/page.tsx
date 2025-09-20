"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerSchema, registerSchemaType } from '@/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema)
  });
  async function handleRegiser(values: registerSchemaType) {
    console.log(values);
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      console.log(res)
      if (res.data.message === "success") {
        toast.success("You Register Successfully" , {position:"top-center"});
        router.push('/login')
      }
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    toast.error(err.response?.data?.message || "Something went wrong", {
      position: "top-center",
    });
  } else {
    toast.error("Unexpected error", { position: "top-center" });
  }
}

  }
  return (
    <>
      <div className="w-[80%] mx-auto my-12 p-5 border-2 rounded-lg shadow-2xl">
        <h1 className='text-3xl text-center my-5 font-bold font-serif'>Register Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegiser)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password:</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>rePassword:</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
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
                  <FormLabel>phone:</FormLabel>
                  <FormControl>
                    <Input type='tel' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='mt-4 cursor-pointer '>Regiser</Button>
          </form>
        </Form>

      </div>


    </>
  )
}
