
import type { NextApiRequest, NextApiResponse } from "next";
import {getSession} from "next-auth/react";

type Review = {
    id: number;
    userId: string;
    userName: string;
    bookId: number;
    rating: number;
    comment: string;
}

const reviews:Review[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req})
    if(req.method === 'POST') {
        if(!session){ 
            return res.status(401).json({message:"You must be logged to submit a review"})
        }

    
    const {bookId,rating,comment} = req.body;

    if(!bookId || !rating || !comment) {
        return res.status(400).json({message:"Missing required fields"})
}
    const newReview = {id: reviews.length +1, 
         userId: session.user?.id as string, 
         userName: session.user?.name as string, 
         bookId, rating, comment}

    reviews.push(newReview)
    return res.status(201).json(newReview)
}else if(req.method === 'GET'){
    const {bookId} = req.query
    if(!bookId) return res.status(400).json({message:"Missing required fields"})
    const bookReviews = reviews.filter((r) => r.bookId === Number(bookId))
    return res.status(200).json(bookReviews)
}
res.setHeader('Allow', ['POST', 'GET'])
return res.status(405).end({message:`Method ${req.method} not allowed`})
}