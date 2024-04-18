import {db} from "@/db/connection";
import {reset} from "@/db/schemas/reset";
import {eq} from "drizzle-orm";

export async function getResetTokenByEmail(email: string){

    const res = await db.select().from(reset).where(eq(reset.email, email));

    if(res.length){
        return res[0];
    }

    return null;
}

export async function getEmailByResetToken({token}: {token: string}){
    const res = await db.select().from(reset).where(eq(reset.token, token));

    if(res.length){
        return res[0];
    }

    return null;
}