"use server";

import { getUserEmailFromToken, deleteVerification } from "@/db/query/verification";
import {verifyUserWithEmail} from "@/db/mutation/user";
import { redirect } from "next/navigation";


export async function verifyAction(token: string){
    const verification = await getUserEmailFromToken(token);

    if(!verification){
        return {error: "Invalid token"}
    }

    const isNotExpired = new Date(verification.expires) > new Date();

    if(!isNotExpired){
        return {error: "Token has expired."}
    }

    await verifyUserWithEmail(verification.email);
    await deleteVerification(verification.id);

    redirect("/auth/login");
}