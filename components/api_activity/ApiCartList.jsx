import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, View, Image, SafeAreaView, Alert } from 'react-native';
import { CartContext } from "../../app/context/cartContext";
import { CART_ACTION_TYPE } from '../../app/reducers/cartReducer';
import AntDesign from "react-native-vector-icons/AntDesign";
import { WishContext } from '../../app/context/wishContext';
import { WISH_ACTION_TYPE } from '../../app/reducers/wishReducer';
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';

const ApiCartList = () => {
    const { cart, dispatch } = useContext(CartContext);
    const {wish , dispatch1} = useContext(WishContext)
    const [quantities, setQuantities] = useState({});
    const quantitiesInitialized = useRef(false);
    renderLeftActions = (progress, dragX) => {
        return (
            <RectButton style={styles.leftAction} onPress={() => { }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        if (!quantitiesInitialized.current) {
            const initialQuantities = cart.reduce((acc, item) => {
                acc[item.id] = 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
            quantitiesInitialized.current = true;
        }
    }, [cart]);

    const removeFromCart = (productId) => {
        dispatch({ type: CART_ACTION_TYPE.REMOVE_FROM_CART, payload: productId });
        setQuantities(prevQuantities => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[productId];
            return updatedQuantities;
        });
        Alert.alert('Removed from Cart', 'Product removed successfully.');
    };

    const removeAllFromCart = () => {
        if (cart.length === 0) {
            Alert.alert('No Products', 'No products in the cart.');
        } else {
            dispatch({ type: CART_ACTION_TYPE.REMOVE_ALL });
            setQuantities({});
            Alert.alert('Cart Cleared', 'All products removed from the cart.');
        }
    };
     
    const isItemInWish = (item) => {
        return wish.some(wishItem => wishItem.id === item.id);
    };

    const addToWishlist = (product) => {
        if (!isItemInWish(product)) {
            dispatch1({ type: WISH_ACTION_TYPE.ADD_TO_WISH, payload: product });
        } else {
            Alert.alert('Product already in wishlist');
        }
    };

    const incrementQuantity = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 1) + 1,
        }));
    };

    const decrementQuantity = (productId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max(1, (prevQuantities[productId] || 1) - 1),
        }));
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            const quantity = quantities[item.id] || 1;
            const discountedPrice = item.price * (1 - item.discountPercentage / 100);
            return total + discountedPrice * quantity;
        }, 0).toFixed(2);
    };

    const renderItem = ({ item }) => {
        const quantity = quantities[item.id] || 1;
        const discountedPrice = item.price * (1 - item.discountPercentage / 100);
        const totalPrice = discountedPrice * quantity;

        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderLeftActions}  onSwipeableOpen={(direction) => {
                    console.log("Swipped..", direction);
                    if (direction === 'left') {
                        removeFromCart(item.id);
                    }
                    else if(direction === 'right'){
                        Alert.alert('Add to WishList', 'Are you sure you want to add the product to WishList?', [
                            { text: 'No', style: 'cancel' },
                            { text: 'Yes', onPress: () => {
                                addToWishlist(item)
                                removeFromCart(item.id)

                            } },
                        ]);
                    }

                }}>
                    <View style={styles.itemContainer}>
                        <Image style={styles.itemImage} source={{ uri: item.thumbnail }} />
                        <Text style={styles.itemText}>{item.title}</Text>
                        <Text style={styles.priceText}>${totalPrice.toFixed(2)} (${discountedPrice.toFixed(2)} each)</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity(item.id)}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity(item.id)}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                            <FontAwesome name='trash' size={24} color="red" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {cart.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No products in the cart <AntDesign name="shoppingcart" size={25} style={{ color: "black" }} /></Text>
                </View>
            ) : (
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.removeAllButton} onPress={removeAllFromCart}>
                    <Text style={styles.removeAllButtonText}>Remove All</Text>
                </TouchableOpacity>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
                    <TouchableOpacity style={styles.buyButton} onPress={() => Alert.alert('Buy Now', 'Proceed to checkout')}>
                        <Text style={styles.buyButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 16,
        flex: 2,
        marginHorizontal: 6,
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
        marginRight: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginLeft: 18,
        marginRight: 10,
    },
    quantityButton: {
        backgroundColor: '#ddd',
        padding: 5,
        borderRadius: 5,
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },

    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    totalContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(225,225,225,0.1)',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buyButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
    },
    buyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    removeAllButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        margin: 20,
    },
    removeAllButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actionsContainer: {
        padding: 20,
        shadowColor: '#bdbdbd',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.01,
        shadowRadius: 5,
        elevation: 3,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default ApiCartList;
