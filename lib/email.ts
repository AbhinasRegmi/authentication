import { Resend } from "resend";
import { AuthenticationVerification } from "@/components/auth/verification";

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

