
import Checkout from "@/components/Checkout"
// import { ShippingRate } from "@/pages/api/shipping-calculation";

// async function calculateShippingRate(cep:string):Promise<ShippingRate> {
//   const response = await fetch("/api/shipping-calculation", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ cep }),
//   });
//   if (!response.ok) { 
//     throw new Error("Failed to calculate shipping rate")
//   }
//   return response.json();
// }



export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Checkout />
    </div>
  )
}
