import type { NextApiRequest, NextApiResponse } from 'next'
export type ShippingRate = {
    cep: string,
    rate:number
}

type ErrorResponse = {
    message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShippingRate | ErrorResponse>
) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" })
        }

    const {cep} = req.body   
    const rate = Number.parseFloat((Math.random() * 20 + 10).toFixed(2)) // Gera um
    if(!cep) {
        return res.status(404).json({ cep: '', rate: 0 })
    }
  res.status(200).json({ cep: cep, rate: rate })
}