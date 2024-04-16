import {
    pgTable,
    text,
    uuid,
    timestamp,
    primaryKey
} from "drizzle-orm/pg-core";

export const verification = pgTable("verification",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        email: text("email"),
        token: text("token"),
        expires: timestamp("expires"),
    },
    (table) => {
        return {
            pk: primaryKey({columns: [table.email, table.token]})
        }
    }
)

