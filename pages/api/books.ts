import type { NextApiRequest, NextApiResponse } from "next"
type Book = {
    id: number
    title: string
    author: string
    price: number
  }
  
  const books: Book[] = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 9.99 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99 },
    { id: 3, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 8.99 },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 11.99 },
  ]
  
  export default function booksHandler(req: NextApiRequest, res: NextApiResponse<Book[]>) {
    res.status(200).json(books)
  }
  
  