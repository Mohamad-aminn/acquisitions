import express from "express";
import sms from "#utils/sms.ts.js";

const router = express.Router();

router.post("/phone/send-opt", async (req, res) => {
    const body = await req.json();

    const isPhoneNumber = body.hasOwnProperty("phoneNumber");
    if(!isPhoneNumber) {
        return res.status(401).json({message: "no phone number!"});
    }
    await sms.send()
})

