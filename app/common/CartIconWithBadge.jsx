// components/CartIconWithBadge.jsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CartContext } from '../context/cartContext';

const CartIconWithBadge = ({ navigation }) => {
  const { cart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <AntDesign name="shoppingcart" size={25} style={{ color: "black" }} onPress={() => navigation.navigate('Cart')} />
      {cart.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cart.length}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default CartIconWithBadge;
