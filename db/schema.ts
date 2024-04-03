import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    uuid
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from '@auth/core/adapters';

export const users = pgTable("user", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    first_name: text("first_name"),
    last_name: text("last_name"),
    email: text("email").unique(),
    password: text("password"),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
})

export const accounts = pgTable(
    "account",
    {
        userId: uuid("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
)
