import * as z from "zod"
export const checkoutSchema = z.object({
    details: z.string().nonempty("Details cannot be empty"),
    phone:z.string().nonempty("Phone cannot be empty").regex(/^01[1250][0-9]{8}$/ , "Not Valid Phone Number"),
    city:z.string().nonempty("City cannot be empty"),
})

export type checkoutSchemaType = z.infer<typeof checkoutSchema>