
import { BookList } from '../components/BookList'
import { Cart } from '../components/Cart'

const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 9.99 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 12.99 },
  { id: 3, title: '1984', author: 'George Orwell', price: 10.99 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 8.99 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 11.99 },
]

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookstore</h1>
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
