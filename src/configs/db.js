import {drizzle} from "drizzle-orm/node-postgres";
import postgres from 'postgres'
import * as schema from "#models/schema.js"
import 'dotenv/config.js'

const db = drizzle(process.env.DATABASE_URL);

export async function main() {
    const client = postgres(process.env.DATABASE_URL, {schema});
    const db = drizzle({ client });
}

export default db;