import {z} from "zod";

const phoneRegExp = new RegExp('^(\\+98|0)?9\\d{9}$');

export const phoneSchema = z.object({
    phoneNumber: z.string().refine((v) =>  phoneRegExp.test(v ?? ""))
})


