import Link from "next/link"

export default function Confirmation() {
  return (
    <div className="max-w-md mx-auto text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
      <p className="mb-4">Thank you for your purchase. Your order has been received and is being processed.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Homepage
      </Link>
    </div>
  )
}