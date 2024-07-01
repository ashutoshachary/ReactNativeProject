import React, { createContext, useReducer } from 'react';
import { authUserReducer } from '../reducers/authUserReducer';

export const initialUserState = {
  email: '',
  isLoggedIn: false
};

export const AuthUserContext = createContext();

const AuthUserProvider = ({ children }) => {
  const [authUserState, authUserDispatch] = useReducer(authUserReducer, initialUserState);

  return (
    <AuthUserContext.Provider value={{ authUserState, authUserDispatch }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
