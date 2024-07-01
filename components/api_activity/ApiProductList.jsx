import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,
    SafeAreaView, Modal,Button, TextInput, FlatList, TouchableHighlight, Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StarRating from '../StarRating';
import { CartContext } from '../../app/context/cartContext';
import { CART_ACTION_TYPE } from '../../app/reducers/cartReducer';
import { WishContext } from '../../app/context/wishContext';
import { WISH_ACTION_TYPE } from '../../app/reducers/wishReducer';
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';
import { LayoutContext } from '../../app/hooks/switchingColumn';
import AsyncStorage from '@react-native-async-storage/async-storage' 

export default function ApiProductList({ ChangeHandler }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
   
    const { cart, dispatch } = useContext(CartContext);
    const {wish , dispatch1} = useContext(WishContext)

    const { layout, toggleLayout } = useContext(LayoutContext);
    const productStorageKey = 'my-api-key'
    renderLeftActions = (progress, dragX) => {
        return (
          <RectButton style={styles.leftAction} onPress={() => {}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[
                  styles.actionText,
    
                ]}>.
              </Text>
            </View>
          </RectButton>
        );
      };

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setFilteredProducts(data.products);
            })
            .catch(err => {
                console.log("Error happened in fetching", err.message);
            });
    }, []);

    useEffect(( )=> {
            AsyncStorage.getItem(productStorageKey).then((data) => {
                if(!data) {
                    fetch('https://dummyjson.com/products')
                    .then(response => response.json())
                    .then(data => {
                        setProducts(data.products);
                        
                    })
                    .catch(err => {
                        console.log("Error happened in fetching", err.message);
                    });
                }else{
                    setProducts(JSON.parse(data));
                    setFilteredProducts(JSON.parse(data));
                }
            }).catch((err)=> {
                console.log(err)
            })
        }, []);
    

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = products.filter(item =>
            (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
            (item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const addToWishlist = (product) => {
        if (!isItemInWish(product)) {
            dispatch1({ type: WISH_ACTION_TYPE.ADD_TO_WISH, payload: product });
        } else {
            Alert.alert('Product already in wishlist');
        }
    };

    const addToCart = (product) => {
        if (!isItemInCart(product)) {
            dispatch({ type: CART_ACTION_TYPE.ADD_TO_CART, payload: product });
        } else {
            Alert.alert('Product already in cart');
        }
    };

    const isItemInCart = (item) => {
        return cart.some(cartItem => cartItem.id === item.id);
    };

    const isItemInWish = (item) => {
        return wish.some(wishItem => wishItem.id === item.id);
    };

    const renderProduct = (product) => {
        const sellingPrice = product.price - (product.price * (product.discountPercentage / 100));

        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
            <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderLeftActions} onSwipeableOpen={(direction) => {
              console.log("Swipped..", direction);
              if (direction === 'left'){
                addToWishlist(product)
              }
              else if (direction === 'right') {
                addToCart(product)
              }
            }}>
            <TouchableOpacity
                key={product.id}
                style={layout.isTwoColumn ? styles.productContainerTwoColumn : styles.productContainer}
                onPress={() => openProductModal(product)}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.thumbnail }} style={layout.isTwoColumn ? styles.productImageSmall : styles.productImage1} />
                    <TouchableOpacity style={styles.wishlistButton} onPress={() => addToWishlist(product)}>
                        <FontAwesome name="heart" size={30} color={wish.some(item => item.id === product.id) ? 'red' : '#000'} />
                    </TouchableOpacity>
                </View>
                <Text style={layout.isTwoColumn ? styles.productTitleSmall : styles.productTitle}>{product.title}</Text>
                <Text style={layout.isTwoColumn ? styles.productPriceSmall : styles.productPrice}>MRP: ${product.price.toFixed(2)}</Text>
                <Text style={layout.isTwoColumn ? styles.productSellingPriceSmall : styles.productSellingPrice}>Selling Price: ${sellingPrice.toFixed(2)}</Text>
                <StarRating rating={product.rating} maxStars={5} />
                <Button title="Add to Cart" onPress={() => addToCart(product)} />
                <TouchableHighlight onPress={() => {}} style={styles.button6}>
                    <Text style={styles.newText1}>Buy Now
                        
                    </Text>
                </TouchableHighlight>
            </TouchableOpacity>
            </Swipeable>
    </GestureHandlerRootView>
        );
    };

    const renderProductDetails = (product) => {
        const sellingPrice = product.price - (product.price * (product.discountPercentage / 100));

        return (
            <ScrollView style={styles.productDetailsContainer}>
                <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.menuButtonText}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.productDetailsTitle}>{product.title}</Text>
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
                <TouchableHighlight onPress={() => addToWishlist(product)} style={styles.button7}>
                    <Text style={styles.newText}>Add To WishList</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => addToCart(product)} style={styles.button6}>
                    <Text style={styles.newText}>Add To Cart</Text>
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
                    <Text style={styles.newText}>Buy Now {'\n'}
                        <Text style={styles.productPrice}>MRP: ${product.price.toFixed(2)}</Text>{'\n'}
                        <Text style={styles.productSellingPrice}>Selling Price: ${sellingPrice.toFixed(2)}</Text>
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => setModalVisible(false)} style={styles.button9}>
                    <Text style={styles.newText}>
                        <Text style={styles.productPrice1}>Close</Text>
                    </Text>
                </TouchableHighlight>
                
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TextInput
                style={styles.searchBar}
                placeholder="🔍 Search by brand, category, or title..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            
            <FlatList
                data={filteredProducts}
                renderItem={({ item }) => renderProduct(item)}
                keyExtractor={item => item.id.toString()}
                key={layout.isTwoColumn ? 'twoColumn' : 'oneColumn'}
                numColumns={layout.isTwoColumn ? 2 : 1}
            />
            {selectedProduct && (
                <Modal visible={modalVisible} animationType="slide">
                    {renderProductDetails(selectedProduct)}
                </Modal>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width:'100%',
        backgroundColor: '#f0f0f0',
    },
    productContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productContainerTwoColumn: {
        flex: 1,
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage1: {
        width: 200,
        height: 200,
    },
    productImageSmall: {
        width: 100,
        height: 100,
    },
    wishlistButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    productTitleSmall: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        textDecorationLine: 'line-through',
        color: 'red',
    },
    productPriceSmall: {
        textDecorationLine: 'line-through',
        color: 'red',
    },
    productSellingPrice: {
        color: 'green',
    },
    productSellingPriceSmall: {
        color: 'green',
    },
    productDetailsContainer: {
        padding: 20,
        backgroundColor: '#fff',
    },
    productDetailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productDetailsImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    productDescription: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    productInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
    infoLabel: {
        fontWeight: 'bold',
    },
    reviewsContainer: {
        marginTop: 20,
    },
    reviewsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    review: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        alignItems:'center',
    },
    reviewText: {
        fontSize: 16,
        color: '#333',
    },
    reviewDate: {
        fontSize: 14,
        color: '#999',
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    metaContainer: {
        marginTop: 20,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        alignItems:'center'
    },
    metaText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    qrCode: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: 10,
    },
    imagesContainer: {
        marginTop: 20,
    },
    additionalImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,
    },
    searchBar: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 10,
        backgroundColor: '#fff',
    },
    button6: {
        backgroundColor: 'cyan',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    button7: {
        backgroundColor: '#f0f',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    newText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign:'center',
    },
    menuButton: {
        position: 'absolute',
        top: -12,
        right: -5,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        // borderColor:'#000',
        // borderWidth: 2,
    },
    menuButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    button9: {
        backgroundColor: 'orange',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom:34,
        marginTop:10,
    },
    productPrice1: {
        color: '#fff',
        fontWeight: 'bold',
    },
    actionText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
    },
    newText1:{
        color:'black'
    }
});
