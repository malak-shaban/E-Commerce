"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { forgotPasswordSchema, forgotPasswordSchemaType } from '@/schema/forgotPassword.schema';


export default function ForgotPassword() {
     const [isVerified, setIsVerified] = useState(false);
    const form = useForm<forgotPasswordSchemaType>({
        defaultValues: {
            email: "",
        },
         resolver: zodResolver(forgotPasswordSchema),
    });
    async function handleForgotPassword(value: forgotPasswordSchemaType) {
        console.log(value);


       try{
          const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: value.email }),
        })
        const data = await res.json();
        console.log(data);
        if (data.statusMsg === "success") {
            toast.success(data.message, { position: "top-center" });
            setIsVerified(true);

        }
        else if(data.statusMsg !== "success"){
            toast.error(data.message, { position: "top-center" });
            setIsVerified(false);
        }
      }catch{

        toast.error( "ERROR" , { position: "top-center" });
        setIsVerified(false);

      }

    }
    return (
        <>
            <div className="w-[50%] mx-auto my-12 p-5 border-2 rounded-lg shadow-2xl">
                <h1 className='text-3xl text-center my-5 font-bold font-serif'>Trouble logging in? </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleForgotPassword)}>

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

                        <Button className='mt-4 cursor-pointer w-full '>Send</Button>
                    </form>
                </Form>
                <div className='mt-5'>
                    <div className='w-full  pt-3 flex justify-center items-center border-t-2'>
                        <Link href={isVerified ? "/verifyResetCode" : ""} className={`font-serif font-bold ${isVerified ? "hover:underline text-blue-600" : "text-gray-400 cursor-not-allowed"}`}> Next </Link>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='w-full  pt-3 flex justify-center items-center border-t-2'>
                        <Link href={"/login"} className='font-serif font-bold hover:underline'> Back to login </Link>
                    </div>
                </div>

            </div>


        </>
    )
}


