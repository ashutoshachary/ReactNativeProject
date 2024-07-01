// CartContext.js
import React, { createContext, useReducer } from 'react';
import { cartReducer, initialCartState } from '../reducers/cartReducer';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
