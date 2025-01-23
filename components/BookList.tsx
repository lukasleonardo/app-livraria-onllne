import { BookItem } from "./BookItem";

interface Book {
  id: number
  title: string
  author: string
  price: number
}

interface BookListProps{
    books?: Book[]
}

export function BookList({books}:BookListProps){
    if(!books || books.length === 0){
      return <div>Não há livros disponíveis...</div>
    }
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    )
}