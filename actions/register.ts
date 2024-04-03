import * as z from "zod";
import {RegisterSchema} from "@/schemas/register";


export async function RegisterAction(values: z.infer<typeof RegisterSchema>){
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Something went wrong!"}
    }

    return {success: "Register successfull."}
}