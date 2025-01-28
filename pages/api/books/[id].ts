import type{NextApiRequest,NextApiResponse} from 'next'
type Book = {
    id: number
    title: string
    author: string
    price: number
    description: string
  }

  // Mock data
  const books: Book[] = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 9.99, description: "A classic novel about the American Dream in the Jazz Age." },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99,description: "A powerful story of racial injustice and loss of innocence in the American South.", },
    { id: 3, title: "1984", author: "George Orwell", price: 10.99,description: "" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 8.99,description: ""  },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 11.99,description: ""  },
  ]


export default function bookDetailsHandler(req: NextApiRequest, 
    res: NextApiResponse<Book | {message:string}>) {
        const{id} = req.query
        const book = books.find((b) => b.id === Number(id))
        if(!book) return res.status(404).json({message:'Book not found'})
            else
    res.status(200).json(book)
}