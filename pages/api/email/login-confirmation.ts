import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/mailer";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const {email} = req.body
    // adicionar posteriormente opção para 2auth e então enviar email se necessário.
    try{
        await sendEmail(
            email, 
            "Login Confirmation", 
            `
        <h1>New login detected</h1>
        <p>A new login was detected for your account. If this wasn't you, please contact support immediately.</p>
             `
    );

        res.status(200).json({ message: "Login confirmation email sent successfully" });
    }catch(error){
        res.status(500).json({ message: "Error sending login confirmation email" });
    }

}