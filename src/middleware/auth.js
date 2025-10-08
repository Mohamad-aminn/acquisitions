import jwt from "jsonwebtoken";
import db from "#configs/db.js";
import {users} from "#models/schema.js"
import {eq} from "drizzle-orm";
import "dotenv/config.js"
import arcjet, {detectBot, shield, tokenBucket} from "@arcjet/node";

export const verifyToken = async (req, res, next) => {
    const token = req.get('x_token');
    if(!token){
        return res.status(401).json({message:"unauthorized!"});
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) {
            return res.status(401).json(err);
        }

        const user = await db.query.users.findFirst({where: eq(users.id, decoded.id)});
        if(!user){
            return res.status(404).json({message:"no user found"});
        }

        req.user = user;
        next()
    })

}

export const aj = arcjet({
    // Get your site key from https://app.arcjet.com and set it as an environment
    // variable rather than hard coding.
    key: process.env.ARCJET_KEY,
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                //"CATEGORY:MONITOR", // Uptime monitoring services
                //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
            ],
        }),
        // Create a token bucket rate limit. Other algorithms are supported.
        tokenBucket({
            mode: "LIVE",
            // Tracked by IP address by default, but this can be customized
            // See https://docs.arcjet.com/fingerprints
            //characteristics: ["ip.src"],
            refillRate: 5, // Refill 5 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 10, // Bucket capacity of 10 tokens
        }),
    ],
});