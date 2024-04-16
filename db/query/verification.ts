import {db} from "@/db/connection";
import {verification} from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getVerificationTokenByEmail(email: string){
    db.query.users.findFirst()

    const res = await db.select().from(verification).where(eq(verification.email, email)).limit(1);

    return res[0] ?? null;
}