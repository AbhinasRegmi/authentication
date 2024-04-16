"use server";

import * as z from 'zod';
import {LoginSchema} from '@/schemas/login';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {signIn} from "@/auth";
import { AuthError } from 'next-auth';

export async function LoginAction(values: z.infer<typeof LoginSchema>){
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid credentials"}
    }

    const {email, password} = validatedFields.data;

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