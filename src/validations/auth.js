import {z} from "zod";

const phoneRegExp = new RegExp('^(\\+98|0)?9\\d{9}$');

export const phoneSchema = z.object({
    phoneNumber: z.string().refine((v) =>  phoneRegExp.test(v ?? ""))
})

export const loginSchema = z.object({
    name: z.string().max(65).trim(),
    password: z.string().max(125).trim(),
    email: z.string().max(125).trim(),
    phoneNumber: z.string().refine((v) =>  phoneRegExp.test(v ?? "")).trim(),
    otp: z.string().max(15).trim()
})


