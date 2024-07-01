import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WishContext } from '../context/wishContext';

const WishIconWithBadge = ({ navigation }) => {
  const { wish } = useContext(WishContext);

  return (
    <View style={styles.container}>
      <AntDesign name="heart" size={25} style={{ color: "black" }} />
      {wish.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{wish.length}</Text>
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

export default WishIconWithBadge;
