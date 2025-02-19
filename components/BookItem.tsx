'use client'
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/cartSlice"
import Image from "next/image"
import Link from "next/link"

export interface Book{
    id:number
    coverImage:string
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


    return (
      <div className="border border-muted p-4 rounded-lg shadow-md bg-background flex flex-col">
      <Link href={`/books/${book.id}`}>
        <Image
          src={book.coverImage || "/placeholder.svg"}
          alt={`Cover of ${book.title}`}
          width={150}
          height={200}
          className="mx-auto mb-4"
        />
      </Link>
      <h3 className="text-lg font-semibold text-foreground mb-2">{book.title}</h3>
      <p className="text-muted-foreground mb-2">{book.author}</p>
      <p className="text-primary font-bold mb-2">${book.price.toFixed(2)}</p>
      <p className="text-muted-foreground mb-4">{book.stock > 0 ? `In stock: ${book.stock}` : "Out of stock"}</p>
      <button
        onClick={handleAddToCart}
        className={`mt-auto px-4 py-2 rounded transition-colors ${
          book.stock > 0
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={book.stock === 0}
      >
        {book.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
    )
}