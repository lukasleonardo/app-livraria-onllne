import { removeFromCart, updateQuantity } from "@/lib/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

export default function CartDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
      dispatch(updateQuantity({ id, quantity }));
    }
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-foreground"
          aria-expanded={isOpen}
          aria-controls="cart-dropdown"
        >
          <ShoppingCart className="w-6 h-6 mr-2" />
          <span className="sr-only">Shopping cart</span>
          <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
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
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-2">
                      <span className="text-foreground">{item.title}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-muted-foreground hover:text-primary mr-2"
                          disabled={item.quantity === 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-foreground mx-2">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-muted-foreground hover:text-primary mr-2"
                          disabled={item.quantity === item.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-foreground mr-2">${(item.price * item.quantity).toFixed(2)}</span>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
}