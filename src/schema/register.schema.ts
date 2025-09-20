import * as z from "zod"
export const registerSchema = z.object({
    name: z.string().nonempty("this field cannot be empty").min(2,"min length is 2 chars").max(10,"max length is 10 chars"),
    email: z.email().nonempty("this field cannot be empty"),
    password:z.string().nonempty("this field cannot be empty").min(6,"min length is 6 chars"),
    rePassword:z.string().nonempty("this field cannot be empty"),
    phone:z.string().regex(/^01[0215][0-9]{8}$/)
}).refine((object)=> object.password === object.rePassword ,{
    path: ["rePassword"],
    error: "password & rePassword not match !!"
});

export type registerSchemaType = z.infer<typeof registerSchema>