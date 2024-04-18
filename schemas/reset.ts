import * as z from "zod";

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email."
    })
})

export const ResetPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password should be at least 6 characters."
    }),
    token: z.string() 
})