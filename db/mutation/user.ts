import {db} from "@/db/connection";
import { users } from "@/db/schemas";
import {eq} from "drizzle-orm";


export async function verifyUserEmail(userID: string){
    await db.update(users).set({emailVerified: new Date()})
    .where(eq(users.id, userID));
}

export async function verifyUserWithEmail(email: string){
    await db.update(users).set({emailVerified: new Date()})
    .where(eq(users.email, email));
}