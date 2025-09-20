import * as z from "zod"
export const resetPasswordSchema = z.object({
    email: z.email().nonempty("this field cannot be empty"),
    newPassword:z.string().nonempty("this field cannot be empty").min(6,"min length is 6 chars"),

})

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>