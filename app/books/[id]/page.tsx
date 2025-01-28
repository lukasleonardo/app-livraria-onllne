'use client';

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import BookReviews from "@/components/BookReviews";
const fetchBook = async (id: string) => {
    const response = await fetch(`/api/books/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch book details");
    }
    return response.json();
};


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

    const { data: book, isLoading:isLoadingBook, error:errorBook } = useQuery({
        queryKey: ["book", id],
        queryFn: () => fetchBook(id),
    });
    const { data: reviews, isLoading:isLoadingReviews, error:errorReviews } = useQuery({
        queryKey: ["reviews", id],
        queryFn: () => fetchReviews(id),
    });

    if(isLoadingBook || isLoadingReviews) return <div>Loading...</div>
    if(errorBook || errorReviews) return <div>An error ocurred {errorBook?.message || errorReviews?.message}</div>
   

    return (
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-xl mb-2">By {book.author}</p>
      <p className="text-lg mb-4">${book.price.toFixed(2)}</p>
      <p className="mb-8">{book.description}</p>
      <BookReviews bookId={book.id} initialReviews={reviews} />
    </div>
    );
}