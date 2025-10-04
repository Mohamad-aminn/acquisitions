import express from "express";
import sms, {randomText, smsResponseCode} from "#utils/sms.js";
import {loginSchema, phoneSchema} from "#validations/auth.js";
import db from "#configs/db.js";
import {otp, users} from "#models/schema.js";
import "dotenv/config.js"
import {desc, eq, or} from "drizzle-orm";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {getUserOrCreateOne} from "#utils/user.js";

const route = express.Router();

route.post("/phone/send-otp", async (req, res) => {
    try {
        const body = req.body;

        const isPhoneNumber = body.hasOwnProperty("phoneNumber");
        if(!isPhoneNumber) {
            return res.status(401).json({message: "no phone number!"});
        }

        const validated = phoneSchema.safeParse(body);
        if(!validated.success) {
            return res.status(401).json(validated);
        }

        const code = (Math.floor(Math.random()*90000) + 10000).toString();

        bcrypt.hash(code, 9, async (err, hash)  => {
            if(err) {
                return res.status(401).json(err);
            }

            await db.insert(otp).values({code:hash, phone: body.phoneNumber, created_at: new Date(), expires_in: new Date(Date.now() + 2 * 60 * 1000)});


            const smsResult = await sms.send(body.phoneNumber, process.env.SMS_FROM, `${code} \n\n` + randomText[Math.floor(Math.random() * 7)])
            if(smsResult.RetStatus !== 1) {
                return res.status(400).json({message: smsResponseCode[smsResult.RetStatus]})
            }

            res.status(201).json({})

        });
    }
    catch (err) {
        res.status(500).json(err)
    }
})

route.post("/phone/verify", async (req, res) => {
    try {
        const body = req.body;
        const validate = loginSchema.safeParse(body);

        if(!validate.success) {
            return res.status(401).json(validate);
        }

        const {name,password, email, phoneNumber, otp: userCode} = body;

        const otpObject = await db.select()
            .from(otp)
            .orderBy(desc(otp.created_at))
            .limit(1);
        console.log(new Date())
        console.log(await db.select().from(otp))
        if (otpObject.length === 0) {
            return  res.status(400).json({message: "you did not request a code yet!"});
        }

        if(otpObject[0].expires_in < new Date()) {
            console.log(new Date(), otpObject[0].expires_in)
            return res.status(401).json({message: 'code expired!'});
        }

        bcrypt.compare(userCode, otpObject[0].code, async (err, result) => {
            if(err) {
                return res.status(401).json(err);
            }
            if(!result) {
                return res.status(400).json({message: 'wrong code!'});
            }

            bcrypt.hash(password, 9, async (err, hash) => {
                if(err) {
                    return res.status(401).json(err);
                }
                const user = await getUserOrCreateOne(
                    {
                        name,
                        phone: phoneNumber,
                        email,
                        password: hash,
                    }
                )
                console.log(user)
                await db.delete(otp).where(eq(otp.phone, phoneNumber));

                const token = jwt.sign({
                    id: user.id
                }, process.env.JWT_SECRET, {expiresIn: "1h"});

                res.status(200).json({token, user});
            })
        });
    }catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

route.delete("/phone/delete", async (req, res) => {
    try {
        const {phoneNumber} = req.body;
        await db.delete(users).where(eq(users.phone, phoneNumber));

        res.status(200).json({phoneNumber});
    }catch (err) {
        res.status(500).json(err);
    }

})

route.get('/users', async (req, res) => {
    const users = await db.query.users.findMany();

    res.status(200).json(users)
})


export default route;