"use server";

import "dotenv/config";
import * as z from "zod";
import {RegisterSchema} from "@/schemas/register";
import bcrypt from "bcryptjs";
import {db} from "@/db/connection";
import { users } from "@/db/schemas";
import {getUserByEmail} from "@/db/query/user";

export async function RegisterAction(values: z.infer<typeof RegisterSchema>){
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Something went wrong!"}
    }

    const {firstName, lastName, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await getUserByEmail(email);
    if(res){
        return {error: "User with given email already exists."}
    }

    await db.
    insert(users).values({
        name: firstName + " " + lastName,
        email,
        password: hashedPassword
    })

    //TODO:Send verification email.

    return {success: "Register successfull."}
}