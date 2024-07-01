import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, SafeAreaView, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Navbar = ({ ChangeHandler, wishlistCount, cartCount, onViewWishlist, onViewCart }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Image style={styles.logo} source={require('../assets/image/my logo.png')} />
        <Text style={styles.companyName}>NMS Service</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onViewWishlist}>
            <FontAwesome name="heart" size={24} color="#fff" />
            {wishlistCount > 0 && <View style={styles.counter}><Text style={styles.counterText}>{wishlistCount}</Text></View>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onViewCart}>
            <FontAwesome name="shopping-cart" size={24} color="#fff" />
            {cartCount > 0 && <View style={styles.counter}><Text style={styles.counterText}>{cartCount}</Text></View>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Text style={styles.menuButtonText}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu}>
          <View style={styles.menu}>
            <Text style={styles.menuItem}><FontAwesome name='user-circle' size={24} color="#000" /> User Profile</Text>
            <TouchableHighlight onPress={onViewCart}>
              <Text style={styles.menuItem}><FontAwesome name="shopping-cart" size={24} color="#000" /> Cart</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={onViewWishlist}>
              <Text style={styles.menuItem}><FontAwesome name="heart" size={24} color="#000" /> Wishlist</Text>
            </TouchableHighlight>

            <Text style={styles.menuItem}><FontAwesome name="cog" size={24} color="#000" /> Settings</Text>
            <TouchableHighlight onPress={() => {
              console.log("TouchableHighlight pressed");
              ChangeHandler();
            }}
              onLongPress={() => {
                console.log("Long pressed")
                ChangeHandler();
              }}>
              <Text style={styles.menuItem}> <FontAwesome name="sign-out" size={24} color="#000" /> Logout</Text>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    marginTop: 35,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#05375a',
  },
  logo: {
    width: 40,
    height: 40,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  menu: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    marginTop: 60,
  },
  menuItem: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    textAlign: 'center',
  },
  counter: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: '#fff',
    fontSize: 8,
  },
});

export default Navbar;
