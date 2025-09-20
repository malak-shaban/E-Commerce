import * as z from "zod"
export const changeMyPasswordSchema = z.object({
    currentPassword: z.string().nonempty("this field cannot be empty").min(6, "min length is 6 chars"),
    password: z.string().nonempty("this field cannot be empty").min(6, "min length is 6 chars"),
    rePassword: z.string().nonempty("this field cannot be empty"),
}).refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "password & rePassword not match !!"
});

export type changeMyPasswordSchemaType = z.infer<typeof changeMyPasswordSchema>