import {
    pgTable,
    text,
    timestamp,
    uuid,
    unique
} from "drizzle-orm/pg-core";



export const reset = pgTable("reset", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    token: text("token").unique().notNull(),
    expires: timestamp("expires").notNull()
},
(table) => {
    return {
        unq: unique().on(table.email, table.token)
    }
}

)