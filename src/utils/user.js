import db from "#configs/db.js";
import {users} from "#models/schema.js";
import {eq, or} from "drizzle-orm";

export const getUserOrCreateOne = async (data) => {
    try {
        const existingUser = await db
            .select()
            .from(users)
            .where(
                or(
                    eq(users.email, data.email),
                    eq(users.phone, data.phone),
                )
            )
            .limit(1);
        console.log('existingUser: ',existingUser)

        if (existingUser.length > 0) {
            return existingUser[0]
        }

        const newUser = await db.insert(users)
            .values({name: data.name, phone: data.phone, password: data.password, email: data.email}).returning();

        console.log('newUser: ',newUser)
        return newUser;
    } catch (err) {
        console.log('error getting user orCreateOne', err);
    }


}

