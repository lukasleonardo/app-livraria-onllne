'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { clearCart, removeFromCart } from "@/lib/cartSlice"
import { useSession } from "next-auth/react"



export default function Checkout(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const cartItems = useAppSelector((state)=>state.cart.items)
    const dispactch = useAppDispatch()
    const router = useRouter()
    const {data:session,status}= useSession()

    useEffect(()=>{
        if(status==="unauthenticated"){
            router.push("/login?redirect=/checkout")
        }
    },[status,router])

    const total = cartItems.reduce((sum,item)=>sum+item.price,0)

    const handleRemoveFromCart = (id:number)=>{       
            dispactch(removeFromCart(id))
        }
    const handleSubmit= async (e:React.FormEvent)=>{
        e.preventDefault()
        try{
          console.log('order submitted', {name,email,address,items:cartItems,total})
          const emailRes = await fetch("/api/email/order-confirmation", 
            {
              method:"POST",
              body:JSON.stringify(
                {email,orderDetails:{name,email,address,items:cartItems,total}})})
              if (!emailRes.ok) {
                throw new Error("Failed to send order confirmation email")
              }
          dispactch(clearCart())
          router.push("/confirmation")
        }catch(error){
          console.error("Error processing order:", error)
          alert("There was an error processing your order. Please try again.")
        }
        
    }

    if(status==="loading"){
        return <p>Loading...</p>
    }

    if(status==="unauthenticated"){
        return null
    }
    if(cartItems.length===0){
        return <p>Your cart is empty</p>
    }


    return(
        <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <h3 className="font-bold">Order Summary</h3>
          {cartItems.map((item,index) => (
            <div key={index} className="flex justify-between">
              <span>{item.title}</span>
              <span>${item.price.toFixed(2)}</span>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="font-bold mt-2">Total: ${total.toFixed(2)}</div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Place Order
        </button>
      </form>
    </div>
    )
}