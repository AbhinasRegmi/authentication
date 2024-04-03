import {
    pgTable,
    uuid
} from "drizzle-orm/pg-core";


export const UserTable = pgTable("user_table", {
    id: uuid("id").defaultRandom().primaryKey()
})