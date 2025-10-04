import {integer, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";

export const trash = pgTable("trashs", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

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

export const otp = pgTable("otps", {
    code: varchar("code").notNull(),
    phone: varchar("phone").notNull(),
    expires_in: timestamp().default(new Date(Date.now() + 2 * 80 * 1000)),
    created_at: timestamp().defaultNow(),
})

export const test = pgTable("tests", {
    code: varchar("code").notNull(),
})

export const userInsertSchema = createInsertSchema(users)

