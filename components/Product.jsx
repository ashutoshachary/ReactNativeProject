import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Navbar from './Navbar';

export default function Product({ChangeHandler}) {
  const [products, setProducts] = useState([]);
  const [isBundle, setIsBundle] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  const toggleBundle = () => {
    setIsBundle(!isBundle);
  };

  const renderProduct = (product) => {
    const sellingPrice = product.price * (1 - product.discountPercentage / 100);

    return (
      <View key={product.id} style={styles.productContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>MRP: ${product.price.toFixed(2)}</Text>
        <Text style={styles.productSellingPrice}>Selling Price: ${sellingPrice.toFixed(2)}</Text>
      </View>
    );
  };

  const renderBundle = (size) => {
    const bundleProducts = products.slice(0, size);
    const totalMRP = bundleProducts.reduce((sum, product) => sum + product.price, 0);
    const totalSellingPrice = bundleProducts.reduce(
      (sum, product) => sum + product.price * (1 - product.discountPercentage / 100),
      0
    );

    return (
      <View key={size} style={styles.bundleContainer}>
        <Text style={styles.bundleTitle}>{size}-Product Bundle</Text>
        <View style={styles.bundleProducts}>
          {bundleProducts.map(renderProduct)}
        </View>
        <Text style={styles.bundlePrice}>Total MRP: ${totalMRP.toFixed(2)}</Text>
        <Text style={styles.bundleSellingPrice}>Total Selling Price: ${totalSellingPrice.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar ChangeHandler={ChangeHandler}/>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleBundle}>
          <Text style={styles.toggleButtonText}>{isBundle ? 'Show Individual Products' : 'Show Bundles'}</Text>
        </TouchableOpacity>
        {isBundle ? (
          <>
            {renderBundle(3)}
            {renderBundle(5)}
          </>
        ) : (
          products.map(renderProduct)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  toggleButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#05375a',
    alignItems: 'center',
    borderRadius: 5,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  productSellingPrice: {
    fontSize: 16,
    color: '#05375a',
  },
  bundleContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#e9f9e9',
    borderRadius: 10,
  },
  bundleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  bundleProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  bundlePrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  bundleSellingPrice: {
    fontSize: 16,
    color: '#05375a',
    textAlign: 'center',
  },
});
