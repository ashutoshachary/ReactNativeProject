import React, { useReducer , createContext} from 'react'

export const initialWishState = [];

export const WishContext = createContext({
    wish:initialWishState,
});