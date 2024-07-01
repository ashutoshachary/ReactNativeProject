import { Alert } from "react-native";

export const WISH_ACTION_TYPE = Object.freeze({
  REMOVE_FROM_WISH: 0,
  ADD_TO_WISH: 1,
  REMOVE_ALL: 2,
  RANDOM_ACTION: 9,
});

export const wishReducer = (state, action) => {
  switch (action.type) {
    case WISH_ACTION_TYPE.ADD_TO_WISH: {
      const productToAdd = action.payload;
      const updatedWish = state.wish ? [...state.wish, productToAdd] : [productToAdd];
      return { ...state, wish: updatedWish };
    }
    case WISH_ACTION_TYPE.REMOVE_FROM_WISH: {
      const productId = action.payload;
      const updatedWish = state.wish ? state.wish.filter(item => item.id !== productId) : [];
      return { ...state, wish: updatedWish };
    }
    case WISH_ACTION_TYPE.REMOVE_ALL: {
      return { ...state, wish: [] };
    }
    default:
      console.warn(`Invalid action type: ${action.type}`);
      Alert.alert("Invalid action");
      return state;
  }
};

export const initialWishState = { wish: [] };
