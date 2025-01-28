'use client'
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/cartSlice"

export interface Book{
    id:number
    title:string
    author:string
    price:number
}

interface BookItemProps{
    book:Book
}

export function BookItem({book}:BookItemProps) {
    const dispatch = useAppDispatch()
    const handleAddToCart=()=>{
        dispatch(addToCart(book))
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
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>
    )
}