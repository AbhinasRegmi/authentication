"use server";

import "dotenv/config";
import * as z from "zod";
import {RegisterSchema} from "@/schemas/register";
import bcrypt from "bcrypt";
import {db} from "@/db/connection";
import { users } from "@/db/schema";
import {eq} from "drizzle-orm";

export async function RegisterAction(values: z.infer<typeof RegisterSchema>){
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Something went wrong!"}
    }

    const {firstName, lastName, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await db.
    select({email: users.email}).
    from(users).
    where(eq(users.email, email)).limit(1);

    if(res.length === 1){
        return {error: "User with given email already exists."}
    }

    await db.
    insert(users).values({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword
    })

    //TODO:Send verification email.

    return {success: "Register successfull."}
}