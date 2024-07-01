import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ rating, maxStars }) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    const starName = i <= rating ? 'star' : 'star-o';
    stars.push(<FontAwesome key={i} name={starName} size={20} color="#ffd700" />);
  }

  return <View style={styles.starContainer}>{stars}</View>;
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
});

export default StarRating;
