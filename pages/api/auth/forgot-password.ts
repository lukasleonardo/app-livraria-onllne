import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/mailer";
import crypto from "crypto";

const passwordResetToken = new Map<string,string>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" })
    }
    const email = req.body.email
    const resetToken = crypto.randomBytes(20).toString('hex')

    passwordResetToken.set(email, resetToken)

    try {
        await sendEmail(
         email,
         "Password Reset",
      `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}">Reset Password</a>
        `,   
        )
        res.status(200).json({ message: "Password reset email sent successfully" })
    }catch(error) {
        console.log("Error sending password reset email",error)
        res.status(500).json({ message: "Error sending password reset email" })
    }
}