'use client'
import { BookList } from '../components/BookList'
import { useQuery} from '@tanstack/react-query';
import { Book } from '../pages/api/books/book-Interface';
import axios from 'axios';
import { useState } from 'react';



// const fetchGroups = (): Promise<Book[]> =>
//   axios.get('/api/books').then((response) => response.data)

async function fetchBooks(page: number): Promise<Book[]> {
  try {
    console.log(`Fetching books for page ${page}`)
    const response = await axios.get<Book[]>(`/api/gutenberg?page=${page}`)
    console.log("API Response:", response)
    if (!response.data) {
      throw new Error("No data received from the API")
    }
    return response.data
  } catch (error) {
    console.error("Error in fetchBooks:", error)
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred while fetching books")
    }
    throw error
  }
}




export default function Home() {
  const [page, setPage] = useState(1)
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books', page],
    queryFn: () => fetchBooks(page),
    
  });
  if (isLoading)return <div>Loading...</div>  
  if(error) return <div>An error ocurred {error.message}</div>
  console.log("Books data:", books)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Books List</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/3">
          <h2 className="text-2xl font-semibold mb-4">Available Books</h2>
          <BookList books={books||[]} />
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Previous Page
            </button>
            <button onClick={() => setPage((p) => p + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next Page
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
