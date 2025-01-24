import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/mailer";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const {email,resetToken} = req.body

    try{
        await sendEmail(
            email,
            "Password Reset",
            `
              <h1>Password Reset Request</h1>
              <p>Click the link below to reset your password:</p>
              <a href="https://yourbookstore.com/reset-password?token=${resetToken}">Reset Password</a>
            `,
          )

        res.status(200).json({ message: "Password reset email sent successfully" });
    }catch(error){
        res.status(500).json({ message: "Error sending password reset email" });
    }

}