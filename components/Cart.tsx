'use client'
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { removeFromCart } from "@/lib/cartSlice"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Cart(){
    const cartItems = useAppSelector((state)=> state.cart.items)
    const dispactch = useAppDispatch()
    const handleRemoveFromCart = (id:number)=>{       
        dispactch(removeFromCart(id))
    }
    const total = cartItems.reduce((sum,item)=>sum+item.price,0)
    const {status}= useSession()

    return(
      <div className="border border-muted p-4 rounded-lg shadow-md bg-background">
      <h2 className="text-xl font-bold mb-4 text-foreground">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item,index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="text-foreground">{item.title}</span>
              <span className="text-foreground">${item.price.toFixed(2)}</span>
              <button onClick={() => handleRemoveFromCart(item.id)} className="text-primary hover:text-primary/90">
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-right">
          <strong className="text-foreground">Total: ${total.toFixed(2)}</strong>
          </div>
          <div className="mt-4">
          <Link
              href={status === "authenticated" ? "/checkout" : "/login?redirect=/checkout"}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
    )
}