
import Checkout from "@/components/Checkout"
import { Navigation } from "../../components/Navigation"

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navigation />
      <Checkout />
    </div>
  )
}
