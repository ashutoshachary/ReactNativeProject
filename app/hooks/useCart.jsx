import React, { useReducer , createContext} from 'react'

export const initialCartState = [];

export const CartContext = createContext({
    cart:initialCartState,
});