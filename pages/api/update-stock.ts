import { NextApiRequest, NextApiResponse } from "next";

type UpdateStockItem = {
    id:number,
    quantity:number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if(req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" })
    }

const {items} : {items:UpdateStockItem[]} = req.body

try{
    console.log("Updating stock for items:", items)
    await new Promise((resolve)=>setTimeout(resolve,1000))
    res.status(200).json({ message: "Stock updated successfully" })
}catch(error){
    console.error("Error updating stock:", error)
    res.status(500).json({ message: "Error updating stock" })
}


}