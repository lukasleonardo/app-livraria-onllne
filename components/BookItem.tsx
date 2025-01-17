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
    return(  
        <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
      <p className="text-green-600 font-bold mt-2">${book.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
    )
}