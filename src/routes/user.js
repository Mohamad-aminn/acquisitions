import express from "express";
import jwt from "jsonwebtoken";
import db from "#configs/db.js";
import {users} from "#models/schema.js"
import {verifyToken} from "#middleware/auth.js";

const route = express.Router();

route.get('/get', verifyToken, (req, res) => {
    const exist = req.cookies.token
    const token = req.cookies['token']
    console.log(req.cookies)

    console.log(exist)
    console.log(token)

     if(!token) {
         res.cookie('token', 'this is value', {
             maxAge: 60 * 60 * 1000,
             httpOnly: true
         })
     }



    return res.status(200).json({user: req.user, exist, urmom:exist})
})

export default route;