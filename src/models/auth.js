import {pgTable, timestamp, varchar} from "drizzle-orm/pg-core";

export const opt = pgTable("otps", {
    code: varchar("code").notNull(),
    phone: varchar("phone").notNull(),
    expires_in: timestamp().notNull(),
    created_at: timestamp().defaultNow(),
})