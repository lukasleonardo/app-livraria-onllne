import type { NextApiRequest, NextApiResponse } from "next";
import { Book } from "./book-Interface";


  
export const books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 9.99,
      description: "A classic novel about the American Dream in the Jazz Age.",
      stock: 10,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 12.99,
      description: "A powerful story of racial injustice and loss of innocence in the American South.",
      stock: 15,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 10.99,
      description: "A dystopian novel set in a totalitarian society.",
      stock: 8,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 8.99,
      description: "A classic romance novel set in 19th century England.",
      stock: 12,
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: 11.99,
      description: "A controversial novel about teenage angst and alienation.",
      stock: 6,
    },
  ]

  
export default function bookHandler(req: NextApiRequest, res: NextApiResponse<Book[]>) {
    res.status(200).json(books)
  }
  
  