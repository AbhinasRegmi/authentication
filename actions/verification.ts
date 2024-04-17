"use server";

import { getUserEmailFromToken } from "@/db/query/verification";
import {verifyUserWithEmail} from "@/db/mutation/user";
import { redirect } from "next/navigation";


export async function verifyAction(token: string){
    const email = await getUserEmailFromToken(token);

    if(email){
        await verifyUserWithEmail(email);
    }else{
        redirect("/auth/error")
    }

    redirect("/auth/login");
}