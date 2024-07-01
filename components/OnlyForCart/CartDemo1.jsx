import React, { useContext } from 'react';
import { StyleSheet, View, Text, Button ,ScrollView} from 'react-native';
import { CartContext } from './CartContext1';
import { CART_ACTION_TYPE } from './CartReducer1';

const CartDemo1 = () => {
  const { state, dispatch } = useContext(CartContext);

  const addToCart1 = () => {
    console.log('addToCart called.');
    dispatch({
      type: CART_ACTION_TYPE.ADD_TO_CART,
      payLoad: {
        productId: new Date().getTime(),
        title: 'watch',
      },
    });
  };

  const removeFromCart1 = (productId) => {
    dispatch({
      type: CART_ACTION_TYPE.REMOVE_FROM_CART,
      payLoad: productId,
    });
  };

  const resetCart1 = () => {
    dispatch({
      type: CART_ACTION_TYPE.REMOVE_ALL,
    });
  };

  const randomAction1 = (productId) => {
    dispatch({
      type: CART_ACTION_TYPE.RANDOM_ACTION,
      payLoad: productId,
    });
  };

  return (
    <View style={styles.container}>
        <ScrollView>
      {state?.cart?.map((item) => (
        <View key={item.productId} style={styles.card}>
          <Text style={styles.text}>{item?.title}</Text>
          <View style={styles.btnContainer}>
            <Button
              title="Remove From Cart"
              onPress={() => removeFromCart1(item.productId)}
              color={styles.removeFromCartBtn.backgroundColor}
            />
            <Button
              title="Random Action"
              onPress={() => randomAction1(item.productId)}
              color={styles.randomActionBtn.backgroundColor}
            />
          </View>
        </View>
      ))}
      <View style={styles.btnContainer}>
        <Button
          title="Add To Cart"
          onPress={addToCart1}
          color={styles.addToCartBtn.backgroundColor}
        />
        <Button
          title="Reset Cart"
          onPress={resetCart1}
          color={styles.resetCartBtn.backgroundColor}
        />
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EAF0F1',
  },
  card: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
  },
  btnContainer: {
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  addToCartBtn: {
    backgroundColor: '#28a745',
  },
  resetCartBtn: {
    backgroundColor: '#dc3545',
  },
  removeFromCartBtn: {
    backgroundColor: '#dc3545',
  },
  randomActionBtn: {
    
    backgroundColor: '#ffc107',
  },
  text: {
    paddingVertical: 10,
    marginTop: 5,
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
});

export default CartDemo1;
