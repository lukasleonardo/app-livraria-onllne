import { BookItem } from "./BookItem";
import { Book} from '../pages/api/books/book-Interface'


interface BookListProps{
    books?: Book[]
}

export function BookList({books}:BookListProps){
    if(!books || books.length === 0){
      return <div>Não há livros disponíveis...</div>
    }
    return(
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
    )
}