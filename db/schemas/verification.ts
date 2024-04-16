import {
    pgTable,
    text,
    uuid,
    timestamp,
    primaryKey,
    unique
} from "drizzle-orm/pg-core";

export const verification = pgTable("verification",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        email: text("email").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires").notNull(),
    },
    (t) => (
        {
            unq: unique().on(t.email, t.token)
        }
    )
)

