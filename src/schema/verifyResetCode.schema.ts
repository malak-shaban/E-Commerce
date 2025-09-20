import * as z from "zod"
export const verifyResetCodeSchema = z.object({
    resetCode: z
    .string()
    .nonempty("This field cannot be empty")
    .regex(/^\d+$/, "Code must contain only digits"),
})

export type verifyResetCodeSchemaType = z.infer<typeof verifyResetCodeSchema>