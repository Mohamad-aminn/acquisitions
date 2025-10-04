import {pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    phone: varchar("phone", {length: 15}).notNull(),
    password: varchar('password', {length: 255}).notNull(),
    role: varchar('role', {length: 50}).notNull().default('user'),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow(),
})

