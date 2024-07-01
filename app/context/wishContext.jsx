import React, { createContext, useReducer } from 'react';
import { wishReducer, initialWishState } from '../reducers/wishReducer';

export const WishContext = createContext();

const WishProvider = ({ children }) => {
  const [state, dispatch1] = useReducer(wishReducer, initialWishState);

  return (
    <WishContext.Provider value={{ wish: state.wish, dispatch1 }}>
      {children}
    </WishContext.Provider>
  );
};

export default WishProvider;
