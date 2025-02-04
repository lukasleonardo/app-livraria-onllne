'use client'
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/cartSlice"

export interface Book{
    id:number
    title:string
    author:string
    price:number
    stock:number
}

interface BookItemProps{
    book:Book
}

export function BookItem({book}:BookItemProps) {
    const dispatch = useAppDispatch()
    const handleAddToCart=()=>{
      if(book.stock > 0){
        dispatch(addToCart(book))
      }
    }

    const handleClick = () => {
      window.location.href = `/books/${book.id}`
    }

    return (
      <div className="themed-bg border border-muted p-4 rounded-lg shadow-md bg-background" >
        <div onClick={handleClick}>
        <h3 className="text-lg font-semibold text-foreground">{book.title}</h3>
        <p className="text-muted-foreground">{book.author}</p>
        <p className="text-primary font-bold mt-2">${book.price.toFixed(2)}</p>
        <p className="text-muted-foreground mt-2">{book.stock > 0 ? `In stock: ${book.stock}` : "Out of stock"}</p>
        <button
          onClick={handleAddToCart}
          className={`mt-4 px-4 py-2 rounded transition-colors ${
            book.stock > 0
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={book.stock === 0}
        >
          {book.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
        </div>
      </div>
    )
}