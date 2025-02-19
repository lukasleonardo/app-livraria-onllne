import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

interface GutenbergBook {
  id: number
  title: string
  summaries: string
  authors: { name: string }[]
  formats: { [key: string]: string }
  download_count: number
}

interface BookResponse {
  id: number
  title: string
  summary: string
  author: string
  price: number
  stock: number
  coverImage: string
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<BookResponse | { message: string }>) {
  const { id } = req.query

  try {
    console.log(`Fetching details for book with id: ${id} from Gutenberg API`)
    const response = await axios.get<GutenbergBook>(`https://gutendex.com/books/${id}`)
    console.log("Gutenberg API Response:", response.data)

    if (!response.data) {
      throw new Error("Invalid response from Gutenberg API")
    }

    const book = response.data
    const summary = book.summaries && book.summaries.length ? book.summaries : "Summary not available."

    const bookResponse: BookResponse = {
      id: book.id,
      title: book.title,
      summary: summary,
      author: book.authors[0]?.name || "Unknown Author",
      price: Number.parseFloat((Math.random() * 20 + 5).toFixed(2)), // Random price between $5 and $25
      stock: Math.floor(Math.random() * 50) + 1, // Random stock between 1 and 50
      coverImage: book.formats["image/jpeg"] || "/placeholder.svg?height=400&width=300",
    }

    console.log("Returning book details:", bookResponse)
    res.status(200).json(bookResponse)
  } catch (error) {
    console.error("Error fetching book:", error)
    res.status(404).json({ message: "Book not found" })
  }
}