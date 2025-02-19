import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

interface GutenbergBook {
  id: number
  title: string
  authors: { name: string }[]
  formats: { [key: string]: string }
  download_count: number
}

interface BookResponse {
  id: number
  title: string
  author: string
  price: number
  stock: number
  coverImage: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BookResponse[] | { message: string }>) {
  const { page = "1" } = req.query
  const pageNumber = Number.parseInt(page as string, 10)
  const perPage = 32 // Number of books per page

  try {
    console.log(`Fetching books from Gutenberg API for page ${pageNumber}`)
    const response = await axios.get(`https://gutendex.com/books/?page=${pageNumber}`)
    console.log("Gutenberg API Response:", response.data)

    if (!response.data || !response.data.results) {
      throw new Error("Invalid response from Gutenberg API")
    }

    const books: BookResponse[] = response.data.results.map((book: GutenbergBook) => ({
      id: book.id,
      title: book.title,
      author: book.authors[0]?.name || "Unknown Author",
      price: Number.parseFloat((Math.random() * 20 + 5).toFixed(2)), // Random price between $5 and $25
      stock: Math.floor(Math.random() * 20) + 1, // Random stock between 1 and 50
      coverImage: book.formats["image/jpeg"] || "/placeholder.svg?height=200&width=150",
    }))

    console.log(`Returning ${books.length} books`)
    res.status(200).json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    res.status(500).json({ message: "Error fetching books from Gutenberg API" })
  }
}

