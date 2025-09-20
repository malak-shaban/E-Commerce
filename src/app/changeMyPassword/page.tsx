"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { changeMyPasswordSchema, changeMyPasswordSchemaType } from '@/schema/changeMyPassword.schema';
import { ChangePass } from '@/authenticationActions/changePass.action';
import { signOut } from 'next-auth/react';


export default function ChangeMyPassword() {
  const router = useRouter();
  const form = useForm<changeMyPasswordSchemaType>({
    defaultValues: {

      currentPassword: "",
      password: "",
      rePassword: "",

    },
    resolver: zodResolver(changeMyPasswordSchema)
  });

  async function handleChangePassword(values: changeMyPasswordSchemaType) {
    console.log(values);
    const res = await ChangePass(values);
    console.log(res);
    if (res.message === "fail") {
      toast.error(res.errors.msg, { position: "top-center" });

    }
    else if (res.message === "success") {
      toast.success("Password changed successfully , please login again", { position: "top-center" });
        await signOut({ redirect: false });  // remove old tokenn
        router.push("/login");
    } else {
      toast.error(res.errors?.msg || "Something went wrong", { position: "top-center" });
    }

  }
  return (
    <>
      <div className="w-[80%] mx-auto my-12 p-5 border-2 rounded-lg shadow-2xl">
        <h1 className='text-3xl text-center my-5 font-bold font-serif'>Change Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleChangePassword)}>

            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password:</FormLabel>
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
                  <FormLabel>RePassword:</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button className='mt-4 cursor-pointer w-full'>Change</Button>
          </form>
        </Form>

      </div>


    </>
  )
}