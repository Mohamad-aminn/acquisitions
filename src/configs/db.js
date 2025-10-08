import {drizzle, NodePgDatabase} from "drizzle-orm/node-postgres";
import postgres from 'postgres'
import {Pool} from "pg"
import * as schema from "#models/schema.js"
import 'dotenv/config.js'

const db = drizzle(process.env.DATABASE_URL, {schema});

export async function main() {
    const client = postgres(process.env.DATABASE_URL, {schema});
    const db = drizzle({ client:Pool }, {
        ...schema
    });
}

export default db;