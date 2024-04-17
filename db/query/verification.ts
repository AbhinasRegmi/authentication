import {db} from "@/db/connection";
import {verification} from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getVerificationTokenByEmail(email: string){
    const res = await db.select().from(verification).where(eq(verification.email, email)).limit(1);

    return res[0] ?? null;
}

export async function getUserEmailFromToken(token: string){
    const res = await db.select({email: verification.email}).from(verification).where(eq(verification.token, token));

    return res[0].email ?? null;
}