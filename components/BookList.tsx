import { Book,BookItem } from "./BookItem";

interface BookListProps{
    books: Book[]
}

export function BookList({books}:BookListProps){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    )
}