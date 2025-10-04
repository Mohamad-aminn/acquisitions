import express from "express";
import sms, {randomText, smsResponseCode} from "#utils/sms.js";
import {phoneSchema} from "#validations/auth.js";
import db from "#configs/db.js";
import {otp, test} from "#models/schema.js";
import "dotenv/config.js"

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

        await db.insert(otp).values({code, phone: "09201370140"})

        const smsResult = await sms.send(body.phoneNumber, process.env.SMS_FROM, `${code} \n\n` + randomText[Math.floor(Math.random() * 7)])
        if(smsResult.RetStatus !== 1) {
            return res.status(400).json({message: smsResponseCode[smsResult.RetStatus]})
        }

        res.status(201).json({})
    }
    catch (err) {
        res.status(500).json(err)
    }
})

route.get("/phone", async (req, res) => {
    await db.select().from(test)
})


export default route;