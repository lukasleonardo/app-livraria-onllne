'use client'
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { clearCart, removeFromCart, updateQuantity } from "@/lib/cartSlice"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import  {ShippingRate} from "@/pages/api/shipping-calculation"
async function calculateShippingRate(cep:string):Promise<ShippingRate> {
  const response = await fetch("/api/shipping-calculation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cep }),
  });
  if (!response.ok) { 
    throw new Error("Failed to calculate shipping rate")
  }
  return response.json();
}

export default function Checkout(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [cep, setCep] = useState('')
    const cartItems = useAppSelector((state)=>state.cart.items)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {data:session,status}= useSession()
    const prevCep = useRef('')
    
    useEffect(() => {
      // Check stock and update quantities if necessary
      cartItems.forEach((item) => {
        if (item.quantity > item.stock) {
          dispatch(updateQuantity({ id: item.id, quantity: item.stock }))
        }
      })
    }, [cartItems, dispatch])
  
    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    const {data:shippingData, refetch:refetchShipping}= useQuery(
      {queryKey:["shipping",cep], 
      queryFn:()=>calculateShippingRate(cep), 
      enabled:false,
      retry:false
    })
   
      
      const shippingCost = shippingData?.rate || 0  
      const total = subTotal + shippingCost
      
      
      useEffect(()=>{
          if(status==="unauthenticated"){
              router.push("/login?redirect=/checkout")
          }
      },[status,router])
    const handleRemoveFromCart = (id:number)=>{       
            dispatch(removeFromCart(id))
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
          dispatch(clearCart())
          router.push("/confirmation")
        }catch(error){
          console.error("Error processing order:", error)
          alert("There was an error processing your order. Please try again.")
        }
        
    }

    

    useEffect(()=>{
      if(cep.length===8 && cep!==prevCep.current){
          refetchShipping()
          prevCep.current = cep
      }
      },[cep,refetchShipping])

      

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
            className="themed-input w-full px-3 py-2 border rounded"
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
            className="themed-input w-full px-3 py-2 border rounded"
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
            className=" themed-input w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="cep" className="block mb-1">
            CEP
          </label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
            maxLength={8}
            className="themed-input w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <h3 className="font-bold">Order Summary</h3>
                    {cartItems.map((item,index) => (
            <div key={index} className="flex justify-between">
               <span>
                {item.title} (x{item.quantity})
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-2">
            <span>Subtotal:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="font-bold mt-2 flex justify-between">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Place Order
        </button>
      </form>
    </div>
    )
}





