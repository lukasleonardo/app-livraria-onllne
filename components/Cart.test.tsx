import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer,{addToCart}  from '../lib/cartSlice'
import Cart from '../components/Cart'


const createMockStore = (initialState = { cart: { items: [] } }) => {
    return configureStore({
      reducer: { cart: cartReducer },
      preloadedState: initialState,
    })
  }

const cartMock={
    cart: {
        items: [{ id: 1, title: "Test Book", price: 9.99 }]
    }
}as any;

describe('Cart', () => {
    it('renders without error when there is no book in the Cart', () => {
        const store = createMockStore({ cart: { items: [] } })
        render(<Provider store={store}><Cart /></Provider>);
        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });

    it('renders without error when there is books in the Cart', () => {
        const store = createMockStore(cartMock)
          store.dispatch(addToCart({ id: 1, title: "Test Book", price: 9.99 }))
      
          render(
            <Provider store={store}>
              <Cart />
            </Provider>,
          )
      
          expect(screen.getByText("Test Book")).toBeInTheDocument()
          expect(screen.getByText("$9.99")).toBeInTheDocument()
          expect(screen.getByText("Total: $9.99")).toBeInTheDocument()
    });
})