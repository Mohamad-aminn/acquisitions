import express from "express";
import sms, {randomText, smsResponseCode} from "#utils/sms.js";
import {loginSchema, phoneSchema} from "#validations/auth.js";
import db from "#configs/db.js";
import {otp, users} from "#models/schema.js";
import "dotenv/config.js"
import {eq} from "drizzle-orm";

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

route.post("/phone/verify", async (req, res) => {
    try {
        const body = req.body;
        const validate = loginSchema.safeParse(body);

        if(!validate.success) {
            return res.status(401).json(validate);
        }

        const otpObject = await db.query.otp.findMany({where: eq(otp.phone, body.phoneNumber)});
        if (otpObject.length === 0) {
            return  res.status(400).json(body.phoneNumber);
        }

        res.status(200).json(otpObject)
    }catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


export default route;