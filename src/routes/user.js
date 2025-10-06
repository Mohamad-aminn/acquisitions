import express from "express";
import jwt from "jsonwebtoken";
import db from "#configs/db.js";
import {users} from "#models/schema.js"
import {verifyToken} from "#middleware/auth.js";

const route = express.Router();

route.get('/get', verifyToken, (req, res) => {
    const userCookie = req.cookies.x_token
    const exist = req.cookies.xx_token

    return res.status(200).json({user: req.user, userCookie, exist})
})

export default route;