import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/mailer";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const {email,orderDetails} = req.body
    
    try{
        await sendEmail(
            email,
            "Order Confirmation",
            `
              <h1>Thank you for your order!</h1>
              <p>Your order details:</p>
              <pre>${JSON.stringify(orderDetails, null, 2)}</pre>
            `,
          )

        res.status(200).json({ message: "Order confirmation email sent successfully" });
    }catch(error){
        res.status(500).json({ message: "Error sending order confirmation email" });
    }

}