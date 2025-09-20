"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, resetPasswordSchemaType } from '@/schema/resetPassword.schema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function ResetPassword() {
    const router = useRouter();
    const form = useForm<resetPasswordSchemaType>({
        defaultValues: {
            email: "",
            newPassword: "",
        },
        resolver: zodResolver(resetPasswordSchema),
    });
    async function handleResetPassword(value: resetPasswordSchemaType) {
        console.log(value);


        try {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: value.email,
                    newPassword: value.newPassword
                }),

            })
            const data = await res.json();
            // console.log(data);
            if (data.statusMsg === "fail") {
                toast.error(data.message, { position: "top-center" });
            }
            if (data.token) {
                const res = await signIn("credentials", {
                    email: value.email,
                    password: value.newPassword,
                    redirect: false,
                    callbackUrl: "/",
                });

                if (res?.ok) {
                    toast.success("You Logged in Successfully", { position: "top-center" });
                    router.push("/");
                    
                } else {
                    toast.error(res?.error, { position: "top-center" });
                }
            }

        } catch {

            toast.error("ERROR", { position: "top-center" });

        }

    }
    return (
        <>
            <div className="w-[80%] mx-auto my-12 p-5 border-2 rounded-lg shadow-2xl">
                <h1 className='text-3xl text-center my-5 font-bold font-serif'>To logging in </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleResetPassword)}>

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
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password:</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className='mt-4 cursor-pointer w-full font-serif'>Send</Button>
                    </form>
                </Form>


            </div>


        </>
    )
}


