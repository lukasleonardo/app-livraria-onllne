import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book{
    id:number
    title:string
    price:number
}

interface CartState{
    items: Book[]
}

const initialState:CartState={
    items:[]
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<Book>)=>{
            state.items.push(action.payload)
        },
        removeFromCart:(state,action:PayloadAction<number>)=>{
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1); 
            }
        },
    },
})

export const {addToCart, removeFromCart} = cartSlice.actions
export default cartSlice.reducer