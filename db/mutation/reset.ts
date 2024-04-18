import {db} from "@/db/connection";
import {eq} from "drizzle-orm";
import {reset} from "@/db/schemas/reset";


export async function deleteResetById({id}:{id: string}){
    await db.delete(reset).where(eq(reset.id, id));
}