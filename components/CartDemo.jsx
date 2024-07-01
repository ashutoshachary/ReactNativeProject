import React, { useReducer } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { CART_ACTION_TYPE, cartReducer } from "./globalState/CartReducer";

const CartDemo = () => {
  const initialState = { cart: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = () => {
    console.log("addToCart called.");
    dispatch({
      type: CART_ACTION_TYPE.ADD_TO_CART,
      payLoad: {
        productId: new Date().getTime(),
        title: "watch",
      },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTION_TYPE.REMOVE_FROM_CART,
      payLoad: productId,
    });
  };

  const resetCart = () => {
    dispatch({
      type: CART_ACTION_TYPE.REMOVE_ALL,
    });
  };

  const randomAction = (productId) => {
    dispatch({
      type: CART_ACTION_TYPE.RANDOM_ACTION,
      payLoad: productId,
    });
  };

  return (
    <View style={styles.container}>
      {state?.cart?.map((item) => (
        <View key={item.productId}>
          <Text style={styles.text}>{item?.title}</Text>
          <Button title="Remove From Cart" onPress={() => removeFromCart(item.productId)} />
          <Button title="Random Action" onPress={() => randomAction(item.productId)} />
        </View>
      ))}
      <View style={styles.btnContainer}>
        <Button title="Add To Cart" onPress={addToCart} />
        <Button title="Reset Cart" onPress={resetCart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 300,
    backgroundColor: "#EAF0F1",
  },
  btnContainer: {
    marginVertical: 30,
    backgroundColor: "#758AA2",
  },
  text: {
    paddingVertical: 10,
    marginTop: 5,
    textAlign: "center",
    color: "white",
    backgroundColor: "#1287A5",
  },
});

export default CartDemo;
