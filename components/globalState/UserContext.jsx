import React, { createContext, useContext } from "react";

export const initialUserState = {
  email: "",
  isLoggedIn: false
};

export const UserContext = createContext({
  user: initialUserState,
  setUser: () => {}
}); // with initial value