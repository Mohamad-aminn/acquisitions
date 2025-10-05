import express from "express";
import jwt from "jsonwebtoken";
import db from "#configs/db.js";
import {users} from "#models/schema.js"
import {verifyToken} from "#middleware/token.js";

const route = express.Router();

route.get('/get', verifyToken, (req, res) => {
    return res.status(200).json(req.user)
})

export default route;