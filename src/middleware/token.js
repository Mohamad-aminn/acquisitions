import jwt from "jsonwebtoken";
import db from "#configs/db.js";
import {users} from "#models/schema.js"
import {eq} from "drizzle-orm";
import "dotenv/config.js"

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