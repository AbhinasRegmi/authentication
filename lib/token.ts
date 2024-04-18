import {db} from "@/db/connection";
import {eq} from "drizzle-orm";
import {verification} from "@/db/schemas/verification";
import {reset} from "@/db/schemas/reset";
import {getVerificationTokenByEmail} from "@/db/query/verification";
import {getResetTokenByEmail} from "@/db/query/reset";
import {v4 as uuidV4} from "uuid";

export async function generateVerificationToken(email: string){
    const token = uuidV4();

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
        await db.delete(verification).where(eq(verification.id, existingToken.id));
    }

    await db.insert(verification).values({
        email,
        token,
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
    })

    return token;
}

export async function generateResetToken(email: string){
    const token = uuidV4();

    const existingToken = await getResetTokenByEmail(email);

    if(existingToken){
        await db.delete(reset).where(eq(reset.id, existingToken.id));
    }

    await db.insert(reset).values({
        email,
        token,
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
    })

    return token;
}