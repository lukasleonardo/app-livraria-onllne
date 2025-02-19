'use client';

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import BookReviews from "@/components/BookReviews";
import { addToCart } from "@/lib/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import { BookDetails } from "@/pages/api/books/book-Interface";
import Image from 'next/image'
// const fetchBook = async (id: string) => {
//     const response = await fetch(`/api/books/${id}`);
//     if (!response.ok) {
//         throw new Error("Failed to fetch book details");
//     }
//     return response.json();
// };



async function fetchBook(id: string): Promise<BookDetails> {
  try {
    console.log(`Fetching details for book with id: ${id}`)
    const response = await axios.get<BookDetails>(`/api/gutenberg/${id}`)
    console.log("API Response:", response)
    if (!response.data) {
      throw new Error("No data received from the API")
    }
    return response.data
  } catch (error) {
    console.error("Error in fetchBook:", error)
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred while fetching book details")
    }
    throw error
  }
}



const fetchReviews = async (id: string) => {
    const response = await fetch(`/api/reviews?bookId=${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch reviews of book");
    }
    return response.json();
};


export default function BookDetailsPage() {
    const params = useParams();
    const id = params?.id as string;
    const dispatch = useAppDispatch();

    const { data: book, isLoading:isLoadingBook, error:errorBook } = useQuery({
        queryKey: ["book", id],
        queryFn: () => fetchBook(id),
        
    });
    


    if(isLoadingBook ) return <div>Loading...</div>
    if(errorBook ) return <div>An error ocurred {errorBook?.message}</div>
    if (!book)return<div>Book is undefined...</div>

    const handleAddToCart = () => {
      if (book.stock > 0) {
        dispatch(addToCart(book))
      }
    }

    return (
      <div className="container mx-auto px-4 py-8 themed-bg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={`Cover of ${book.title}`}
            width={300}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4 text-foreground">{book.title}</h1>
          <p className="text-xl mb-2 text-foreground">By {book.author}</p>
          <p className="text-lg mb-4 text-primary">${book.price.toFixed(2)}</p>
          <p className="mb-4 text-muted-foreground">{book.stock > 0 ? `In stock: ${book.stock}` : "Out of stock"}</p>
          <button
            onClick={handleAddToCart}
            className={`themed-button px-4 py-2 rounded mb-8 ${
              book.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={book.stock === 0}
          >
            {book.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Summary</h2>
            <p className="text-muted-foreground">{book.summary}</p>
          </div>
          <BookReviews bookId={book.id} />
        </div>
      </div>
    </div>
      )
}

