import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, SafeAreaView , TouchableHighlight } from 'react-native';

const Navbar = ({ChangeHandler}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Image style={styles.logo} source={require('../assets/image/my logo.png')} />
        <Text style={styles.companyName}>NMS Sevice</Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu}>
          <View style={styles.menu}>
            <Text style={styles.menuItem}>User Profile</Text>
            <Text style={styles.menuItem}>Cart</Text>
            <Text style={styles.menuItem}>Wishlist</Text>
            <Text style={styles.menuItem}>Settings</Text>
            <TouchableHighlight onPress={() => {
                console.log("TouchableHighlight pressed");
                ChangeHandler();
            }}
                onLongPress={() => {
                    console.log("Long pressed")
                    ChangeHandler();

                }} >
                  <Text style={styles.menuItem}>Logout</Text>
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
    marginTop:35,
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
  },
});

export default Navbar;
