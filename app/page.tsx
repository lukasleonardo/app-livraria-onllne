'use client'
import { BookList } from '../components/BookList'
import  Cart  from '../components/Cart'
import { useQuery} from '@tanstack/react-query';
import { Book } from '../pages/api/books/book-Interface';
import axios from 'axios';


const fetchGroups = (): Promise<Book[]> =>
  axios.get('/api/books').then((response) => response.data)




export default function Home() {
  
  const { data: books, isLoading, error } = useQuery({ queryKey: ['books'], queryFn: fetchGroups })

  if (isLoading)return <div>Loading...</div>  
  if(error) return <div>An error ocurred {error.message}</div>


  return (
    <main className="container mx-auto px-4 py-8">
       
      <h1 className="text-3xl font-bold mb-8">Books List</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Available Books</h2>
          <BookList books={books} />
        </div>
        <div className="md:w-1/3">
          <Cart />
          
        </div>
      </div>
    </main>
  );
}
