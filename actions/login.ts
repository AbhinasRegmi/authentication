"use server";

import * as z from 'zod';
import {LoginSchema} from '@/schemas/login';

export async function LoginAction(values: z.infer<typeof LoginSchema>){
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid credentials"}
    }

    return {success: "Login successful"}
}