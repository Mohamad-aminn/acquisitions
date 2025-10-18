import express from "express";
import jwt from "jsonwebtoken";
import db from "#configs/db.js";
import {users} from "#models/schema.js"
import {verifyToken} from "#middleware/auth.js";
import {eq} from "drizzle-orm";

const route = express.Router();


route.get('/get', verifyToken, async (req, res) => {
    return res.status(200).json(req.user)
})

route.post('/patch', verifyToken, async (req, res) => {
    try {
        const body = req.body;

         await db.update(users).set({...body}).where(eq(users.id, req.user.id));
         return res.status(200).json({})

    }catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

export default route;