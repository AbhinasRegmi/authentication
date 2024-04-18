"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas/reset";
import {ResetPasswordSchema} from "@/schemas/reset";
import { getUserByEmail } from "@/db/query/user";
import { sendResetEmail } from "@/lib/email";
import { generateResetToken } from "@/lib/token";
import {getEmailByResetToken} from "@/db/query/reset";
import { updateUserPassword } from "@/db/mutation/user";
import {deleteResetById} from "@/db/mutation/reset";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";


export async function ResetAction(values: z.infer<typeof ResetSchema>) {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Please enter a valid email" }
    }

    const user = await getUserByEmail(validatedFields.data.email);

    try {

        if (user && user.email) {
            const token = await generateResetToken(user.email);

            await sendResetEmail({
                email: user.email,
                name: user.name ?? "User",
                link: `http://localhost:3000/auth/reset/password?token=${token}`
            });

        }
    } catch (err) {
        return { error: "Something went wrong." }
    }

    return { success: "Reset link has been sent." }
}

export async function ResetPasswordAction(values: z.infer<typeof ResetPasswordSchema>){
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Enter a valid password."}
    }

    const {password, token} = validatedFields.data;

    const resetResponse = await getEmailByResetToken({token});
    
    if(!resetResponse){
        return {error: "Something went wrong."}
    }

    const isExpired = new Date() > new Date(resetResponse.expires);

    if(isExpired){
        return {error: "The reset link has expired."}
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    await Promise.all([
        updateUserPassword({email: resetResponse.email, password: hashedPassword}),
        deleteResetById({id: resetResponse.id}),
    ])
    .catch(() => {
        return {error: "Something went wrong."}
    })

    redirect("/auth/login");
}