import { Resend } from "resend";
import { AuthenticationVerification } from "@/components/auth/verification-email";
import {ResetEmail} from "@/components/auth/reset-email";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({email, name, link}: {email: string, name: string, link: string}){
    try{
        await resend.emails.send({
            from: "Authorization <auth@abhinasregmi.com.np>",
            to: [email],
            subject: "Verify your account",
            react: AuthenticationVerification({name, link, imageUrl: 'http://localhost:3000/vercel.svg'})
        })
    }catch(err){
        throw err;
    }
}

export async function sendResetEmail({email, name, link}: {email: string, name: string, link: string}){
    try{
        await resend.emails.send({
            from: "Authorization <auth@abhinasregmi.com.np>",
            to: [email],
            subject: "Reset you password",
            react: ResetEmail({name, link, imageUrl: 'http://localhost:3000/vercel.svg'})
        })
    }catch(err){
        throw err;
    }
}

