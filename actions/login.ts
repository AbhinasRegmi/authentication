"use server";

import * as z from 'zod';
import {LoginSchema} from '@/schemas/login';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {signIn} from "@/auth";
import { AuthError } from 'next-auth';
import {getUserByEmail} from "@/db/query/user";
import {generateVerificationToken} from "@/lib/token";
import {sendEmail} from "@/lib/email";

export async function LoginAction(values: z.infer<typeof LoginSchema>){
    "use server";
    
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid credentials"}
    }

    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return {error: "Invalid credentials"}
    }

    if(!existingUser.emailVerified){
        const token = await generateVerificationToken(email);
        sendEmail({email, name: existingUser.name ?? 'User', link: `${process.env.ROOT_URL}/auth/verification?token=${token}`})
        return {error: "User is not verified. Verification link has been sent."}
    }

    
    try{

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

    }catch(err){

        if(err instanceof AuthError){
            switch(err.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials"}
                case "AccessDenied":
                    return {error: "User is not verified."}
                default:
                    return {error: "Something went wrong"}
            }
        }

        throw err;
    }

    return {success: "Login successful"}
}

export async function ProviderLogin(provider: "google" | "github"){
    "use server";

    try{

        await signIn(provider, {
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }catch(err){
        throw err;
    }
}