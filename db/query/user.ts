import {db} from "@/db/connection";
import { users } from "@/db/schemas";
import {eq} from "drizzle-orm";

export async function getUserByEmail(email: string){
    let res = (await db.select().from(users).where(eq(users.email, email)));

    if(res.length == 0){
        return null;
    }

    return res[0];
}

export async function getUserById(id: string){
    let res = await db.select().from(users).where(eq(users.id, id));

    if(res.length === 0){
        return null;
    }

    return res[0];
}