import { removeFromCart } from "@/lib/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="relative" onBlur={() => setIsOpen(false)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-foreground"
          aria-expanded={isOpen}
          aria-controls="cart-dropdown"
        >
          <ShoppingCart className="w-6 h-6 mr-2" />
          <span className="sr-only">Shopping cart</span>
          <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">{cartItems.length}</span>
        </button>
        {isOpen && (
          <div
            id="cart-dropdown"
            className="absolute right-0 mt-2 w-64 bg-background border border-muted rounded-md shadow-lg z-10"
          >
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4 text-foreground">Your Cart</h2>
              {cartItems.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty</p>
              ) : (
                <>
                  {cartItems.map((item,index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <span className="text-foreground">{item.title}</span>
                      <div className="flex items-center">
                        <span className="text-foreground mr-2">${item.price.toFixed(2)}</span>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-muted-foreground hover:text-primary"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 text-right">
                    <strong className="text-foreground">Total: ${total.toFixed(2)}</strong>
                  </div>
                  <div className="mt-4 text-right">
                      <Link
                        href={status === "authenticated" ? "/checkout" : "/login?redirect=/checkout"}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                      >Proceed to Checkout
                      </Link>

                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
}