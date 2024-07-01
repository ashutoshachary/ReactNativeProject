import React, { createContext, useReducer } from 'react';
import { cartReducer1, initialState1 } from './CartReducer1';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer1, initialState1);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
