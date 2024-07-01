import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Modal, Button, TextInput, FlatList, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Navbar from './Navbar';
import StarRating from './StarRating';

export default function Product({ ChangeHandler }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isBundle, setIsBundle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewWishlist, setViewWishlist] = useState(false);
  const [viewCart, setViewCart] = useState(false);
  const [isTwoColumn, setIsTwoColumn] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter(product =>
      (product.title?.toLowerCase().includes(lowercasedQuery) || '') ||
      (product.category?.toLowerCase().includes(lowercasedQuery) || '') ||
      (product.brand?.toLowerCase().includes(lowercasedQuery) || '')
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const toggleBundle = () => {
    setIsBundle(!isBundle);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => [...prevWishlist, product]);
  };

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const renderProduct = (product) => {
    const sellingPrice = product.price * (1 - product.discountPercentage / 100);

    return (
      <TouchableOpacity
        key={product.id}
        style={isTwoColumn ? styles.productContainerTwoColumn : styles.productContainer}
        onPress={() => openProductModal(product)}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.thumbnail }} style={isTwoColumn ? styles.productImageSmall : styles.productImage1} />
          <TouchableOpacity style={styles.wishlistButton} onPress={() => addToWishlist(product)}>
            <FontAwesome name="heart" size={30} color={wishlist.some(item => item.id === product.id) ? 'red' : '#000'} />
          </TouchableOpacity>
        </View>
        <Text style={isTwoColumn ? styles.productTitleSmall : styles.productTitle}>{product.title}</Text>
        <Text style={isTwoColumn ? styles.productPriceSmall : styles.productPrice}>MRP: ${product.price.toFixed(2)}</Text>
        <Text style={isTwoColumn ? styles.productSellingPriceSmall : styles.productSellingPrice}>Selling Price: ${sellingPrice.toFixed(2)}</Text>
        <StarRating rating={product.rating} maxStars={5} />
        <Button title="Add to Cart" onPress={() => addToCart(product)} />
      </TouchableOpacity>
    );
  };

  const renderBundle = (size) => {
    const bundleProducts = filteredProducts.slice(0, size);
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

  const renderProductDetails = (product) => {
    const sellingPrice = product.price * (1 - product.discountPercentage / 100);

    return (
      <ScrollView >
        <Navbar ChangeHandler={ChangeHandler} wishlistCount={wishlist.length} cartCount={cart.length} onViewWishlist={() => setViewWishlist(true)} onViewCart={() => setViewCart(true)} />

        <ScrollView contentContainerStyle={styles.productDetailsContainer}>

          <Text style={styles.productDetailsTitle}><TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.menuButtonText}>✕</Text>
          </TouchableOpacity>
            <Text>{'\n'}</Text>
            {product.title}</Text>
          <Image source={{ uri: product.thumbnail }} style={styles.productDetailsImage} />
          <Text style={styles.infoLabel}>Description:</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Category:</Text> {product.category}</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Brand:</Text> {product.brand}</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Weight:</Text> {product.weight}g</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Dimensions:</Text> {`${product.dimensions?.width} x ${product.dimensions?.height} x ${product.dimensions?.depth}`}</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Warranty:</Text> {product.warrantyInformation}</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Shipping Info:</Text> {product.shippingInformation}</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Availability:</Text> {product.availabilityStatus}</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Return Policy:</Text> {product.returnPolicy}</Text>
          <Text style={styles.productInfo}><Text style={styles.infoLabel}>Minimum Order Quantity:</Text> {product.minimumOrderQuantity}</Text>
          <TouchableHighlight  onPress={() => addToWishlist(product)} style={styles.button7}>
          <Text style={styles.newTextContainer}>
              <Text style={styles.newText}>Add To WishList
                 </Text>
            </Text>          
            </TouchableHighlight>
          <TouchableHighlight onPress={() => addToCart(product)} style={styles.button6}>
            <Text style={styles.newTextContainer}>
              <Text style={styles.newText}>Add To Cart
                 </Text>
            </Text>
          </TouchableHighlight>
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>Reviews:</Text>
            {product.reviews?.map((review, index) => (
              <View key={index} style={styles.review}>
                <StarRating rating={review.rating} maxStars={5} />
                <Text style={styles.reviewText}>{review.comment}</Text>
                <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
                <Text style={styles.reviewerName}>{review.reviewerName}</Text>
              </View>
            ))}
          </View>
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>Created At: {new Date(product.meta?.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.metaText}>Updated At: {new Date(product.meta?.updatedAt).toLocaleDateString()}</Text>
            <Text style={styles.metaText}>Barcode: {product.meta?.barcode}</Text>
            <Image source={{ uri: product.meta?.qrCode }} style={styles.qrCode} />
          </View>
          <View style={styles.imagesContainer}>
            <FlatList
              horizontal
              data={product.images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Image source={{ uri: item }} style={styles.additionalImage} />}
            />
          </View>
          <StarRating rating={product.rating} maxStars={5} />
          <TouchableHighlight onPress={() => addToCart(product)} style={styles.button6}>
            <Text style={styles.newTextContainer}>
              <Text style={styles.newText}>Buy Now {'\n'}
                <Text style={isTwoColumn ? styles.productPriceSmall : styles.productPrice}>MRP: ${product.price.toFixed(2)}</Text>{'\n'}
                <Text style={isTwoColumn ? styles.productSellingPriceSmall : styles.productSellingPrice}>Selling Price: ${sellingPrice.toFixed(2)}</Text>
              </Text>
            </Text>
          </TouchableHighlight>


          <Button title="Close" onPress={() => setModalVisible(false)} />
        </ScrollView>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar ChangeHandler={ChangeHandler} wishlistCount={wishlist.length} cartCount={cart.length} onViewWishlist={() => setViewWishlist(true)} onViewCart={() => setViewCart(true)} />
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search by brand, category, or title..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleBundle}>
          <Text style={styles.toggleButtonText}>{isBundle ? 'Show Individual Products' : 'Show Bundles'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={() => setIsTwoColumn(prev => !prev)}>
          <Text style={styles.toggleButtonText}>{isTwoColumn ? 'Show 1 Product per Row' : 'Show 2 Products per Row'}</Text>
        </TouchableOpacity>
        {isBundle ? (
          <>
            {renderBundle(3)}
            {renderBundle(5)}
          </>
        ) : (
          <View style={styles.productsContainer}>
            {filteredProducts.map((product, index) => (
              <View key={product.id} style={isTwoColumn ? styles.productContainerWrapper : null}>
                {renderProduct(product)}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedProduct && renderProductDetails(selectedProduct)}
      </Modal>

      <Modal
        visible={viewWishlist}
        animationType="slide"
        onRequestClose={() => setViewWishlist(false)}
      >
        <Navbar ChangeHandler={ChangeHandler} wishlistCount={wishlist.length} cartCount={cart.length} onViewWishlist={() => setViewWishlist(true)} onViewCart={() => setViewCart(true)} />

        <ScrollView style={styles.modalContent}>
          <View style={styles.wishlistContainer}>

            <Text style={styles.modalTitle}>Wishlist</Text>
            {wishlist.length === 0 ? (
              <Text>No items in wishlist.</Text>
            ) : (
              wishlist.map((item, index) => (
                
                <View key={index} style={styles.card}>
                  <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardTitle}>Selling Price: ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                      <FontAwesome name="trash" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
            <Button title="Close" onPress={() => setViewWishlist(false)} />
          </View>
        </ScrollView>
      </Modal>

      <Modal
        visible={viewCart}
        animationType="slide"
        onRequestClose={() => setViewCart(false)}
      >
        <Navbar ChangeHandler={ChangeHandler} wishlistCount={wishlist.length} cartCount={cart.length} onViewWishlist={() => setViewWishlist(true)} onViewCart={() => setViewCart(true)} />

        <ScrollView style={styles.modalContent}>

          <View style={styles.cartContainer}>
            <Text style={styles.modalTitle}>Cart</Text>
            {cart.length === 0 ? (
              <Text>No items in cart.</Text>
            ) : (
              cart.map((item, index) => (
                <View key={index} style={styles.card}>
                  <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                   
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <FontAwesome name="trash" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
            <Button title="Close" onPress={() => setViewCart(false)} />
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  newText: {
    textAlign: 'center',
    fontWeight: 'bold'

  },
  button6: {
    backgroundColor: 'cyan',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  button7: {
    backgroundColor: 'orange',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom:25,
  },
  productContainerWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  productContainerTwoColumn: {
    flex: 1,
    padding: 5,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  productImageSmall: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  productTitleSmall: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#05375a',
  },
  productPriceSmall: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  productSellingPriceSmall: {
    fontSize: 12,
    color: '#d9534f',
    marginBottom: 10,
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productImage1: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  imageContainer: {
    position: 'relative',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    margin: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
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
    flex: 1,
    alignSelf: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    color: '#05375a',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  productSellingPrice: {
    fontSize: 16,
    color: '#d9534f',
    marginBottom: 10,
  },
  bundleContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#e9f9e9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  bundleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#05375a',
  },
  bundleProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bundlePrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  bundleSellingPrice: {
    fontSize: 16,
    color: '#d9534f',
    textAlign: 'center',
  },
  productDetailsContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "gray",
    shadowOpacity: 1,
    shadowOffset: 2,
    shadowRadius: 10,
  },
  productDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#05375a',
    borderRadius: 10,
    shadowColor: "gray",
    shadowOpacity: 1,
    shadowOffset: 2,
    shadowRadius: 10,
  },
  productDetailsImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  productInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#05375a',
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#05375a',
  },
  review: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  reviewDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#05375a',
  },
  metaContainer: {
    marginTop: 20,
  },
  metaText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  imagesContainer: {
    marginTop: 20,
  },
  additionalImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productDetailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  productDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDetailsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    borderBlockColor: 'black',
    borderWidth: 4,
    borderRadius: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonText: {

    fontSize: 30,
    color: 'red',
  },
  wishlistContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  cartContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  productContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  productSellingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#05375a',
    borderRadius: 5,
    marginVertical: 10,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
