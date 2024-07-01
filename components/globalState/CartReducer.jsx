import { Alert } from "react-native";

export const CART_ACTION_TYPE = Object.freeze({
  REMOVE_FROM_CART: 0,
  ADD_TO_CART: 1,
  REMOVE_ALL: 2,
  RANDOM_ACTION: 9,
});

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTION_TYPE.ADD_TO_CART: {
      const productToAdd = action.payLoad;
      const updatedCart = state.cart ? [...state.cart, productToAdd] : [productToAdd];
      return { ...state, cart: updatedCart };
    }
    case CART_ACTION_TYPE.REMOVE_FROM_CART: {
      const productId = action.payLoad;
      const updatedCart = state.cart ? state.cart.filter(item => item.productId !== productId) : [];
      return { ...state, cart: updatedCart };
    }
    case CART_ACTION_TYPE.REMOVE_ALL: {
      return { ...state, cart: [] };
    }
    default:
      Alert.alert("Invalid action");
      return state;
  }
};
