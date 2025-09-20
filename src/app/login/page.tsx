"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { loginSchema, loginSchemaType } from '@/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react'
import Link from 'next/link';


export default function Login() {
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  async function handleLogin(value: loginSchemaType) {
    console.log(value);


    const res = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(res);
    if (res?.ok) {
      toast.success("You Loged in Successfully", { position: "top-center" });
      window.location.href = "/";
    }
    else {
      toast.error(res?.error, { position: "top-center" });
    }
  }


  
  return (
    <>
      <div className="w-[80%] mx-auto my-12 p-5 border-2 rounded-lg shadow-2xl">
        <h1 className='text-3xl text-center my-5 font-bold font-serif'>Login Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>

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
            <Button className='mt-4 cursor-pointer w-full '>Login</Button>
          </form>
        </Form>
        <div className='w-full mt-4 flex justify-center items-center'>
          <Link href={"/forgotPassword"} className='font-serif font-bold hover:underline'> Forgot Password ? </Link>
        </div>

      </div>


    </>
  )
}

