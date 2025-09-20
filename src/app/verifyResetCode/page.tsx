"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyResetCodeSchema , verifyResetCodeSchemaType } from '@/schema/verifyResetCode.schema';
import { useRouter } from 'next/navigation';


export default function VerifyResetCode() {
    const router = useRouter();
    const form = useForm<verifyResetCodeSchemaType>({
        defaultValues: {
            resetCode: "",
        },
        resolver: zodResolver(verifyResetCodeSchema),
    });
    async function handleVerifyResetCode(value: verifyResetCodeSchemaType) {
        console.log(value);


        try {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ resetCode: value.resetCode }),
            })
            const data = await res.json();
            console.log(data);
            if (data.status === "Success") {
                toast.success("Correct code", { position: "top-center" });
                router.push("/resetPassword");

            }
            else if (data.status !== "Success") {
                toast.error("Invalid code", { position: "top-center" });
            }
        } catch {

            toast.error("ERROR", { position: "top-center" });

        }

    }
    return (
        <>
            <div className="w-[80%] mx-auto my-12 p-5 border-2 rounded-lg shadow-2xl">
                <h1 className='text-3xl text-center my-5 font-bold font-serif'> Reset Code </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleVerifyResetCode)}>

                        <FormField
                            control={form.control}
                            name="resetCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reset Code:</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className='mt-4 cursor-pointer w-full '>OK</Button>
                    </form>
                </Form>


            </div>


        </>
    )
}