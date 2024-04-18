import { Resend } from "resend";
import { AuthenticationVerification } from "@/components/auth/verification-email";
import {ResetEmail} from "@/components/auth/reset-email";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({email, name, link}: {email: string, name: string, link: string}){
    try{
        await resend.emails.send({
            from: `Authorization <${process.env.RESEND_EMAIL}>`,
            to: [email],
            subject: "Verify your account",
            react: AuthenticationVerification({name, link, imageUrl: process.env.LOGO_URL ?? ''})
        })
    }catch(err){
        throw err;
    }
}

export async function sendResetEmail({email, name, link}: {email: string, name: string, link: string}){
    try{
        await resend.emails.send({
            from: `Authorization <${process.env.RESEND_EMAIL}>`,
            to: [email],
            subject: "Reset you password",
            react: ResetEmail({name, link, imageUrl: process.env.LOGO_URL ?? ''})
        })
    }catch(err){
        throw err;
    }
}

