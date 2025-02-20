import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Book{
    id:number
    title:string
    price:number
    stock:number
}

interface CartItem extends Book{
    quantity:number
}

interface CartState{
    items: CartItem[]
}

const initialState:CartState={
    items: []
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<Book>)=>{
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)

            if (existingItemIndex !== -1) {
              // Item already exists in cart
              const existingItem = state.items[existingItemIndex]
              if (existingItem.quantity < action.payload.stock) {
                // Increase quantity if stock allows
                existingItem.quantity += 1
              }
            } else {
              // Add new item to cart
              state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart:(state,action:PayloadAction<number>)=>{
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1); 
            }
        },
        updateQuantity:(state,action:PayloadAction<{id:number,quantity:number}>)=>{
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = Math.min(action.payload.quantity, item.stock);
            }
        },
        clearCart: (state) => {
            state.items = []
        },
    },
})

export const {addToCart, removeFromCart,clearCart, updateQuantity} = cartSlice.actions
export default cartSlice.reducer