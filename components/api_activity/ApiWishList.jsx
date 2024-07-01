import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, View, Image, SafeAreaView, Alert } from 'react-native';
import { WishContext } from "../../app/context/wishContext";
import { WISH_ACTION_TYPE } from '../../app/reducers/wishReducer';
import { CartContext } from '../../app/context/cartContext';
import { CART_ACTION_TYPE } from '../../app/reducers/cartReducer';
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';
import AntDesign from "react-native-vector-icons/AntDesign";
import { FontAwesome } from '@expo/vector-icons';

const ApiWishList = () => {
    const { wish, dispatch1 } = useContext(WishContext);
    const { cart, dispatch } = useContext(CartContext);
    const [quantities, setQuantities] = useState({});
    const quantitiesInitialized = useRef(false);

    useEffect(() => {
        if (!quantitiesInitialized.current) {
            const initialQuantities = wish.reduce((acc, item) => {
                acc[item.id] = 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
            quantitiesInitialized.current = true;
        }
    }, [wish]);
    const removeAllFromWish = () => {
        if (wish.length === 0) {
            Alert.alert('No Products', 'No products in the WishList.');
        } else {
            dispatch1({ type: WISH_ACTION_TYPE.REMOVE_ALL });
            setQuantities({});
            Alert.alert('WishList Cleared', 'All products removed from the WishList.');
        }
    };

    const removeFromWish = (productId) => {
        dispatch1({ type: WISH_ACTION_TYPE.REMOVE_FROM_WISH, payload: productId });
        setQuantities(prevQuantities => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[productId];
            return updatedQuantities;
        });
        Alert.alert('Removed from Wishlist', 'Product removed successfully.');
    };

    const isItemInCart = (item) => {
        return cart.some(cartItem => cartItem.id === item.id);
    };

    const addToCart = (product) => {
        if (!isItemInCart(product)) {
            dispatch({ type: CART_ACTION_TYPE.ADD_TO_CART, payload: product });
            removeFromWish(product.id); 
        } else {
            Alert.alert('Product already in cart');
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
        return wish.reduce((total, item) => {
            const quantity = quantities[item.id] || 1;
            const discountedPrice = item.price * (1 - item.discountPercentage / 100);
            return total + discountedPrice * quantity;
        }, 0).toFixed(2);
    };

    const renderLeftActions = (progress, dragX, item) => {
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

    const renderRightActions = (progress, dragX, item) => {
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

    const renderItem = ({ item }) => {
        const quantity = quantities[item.id] || 1;
        const discountedPrice = item.price * (1 - item.discountPercentage / 100);
        const totalPrice = discountedPrice * quantity;

        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Swipeable renderLeftActions={renderLeftActions}  renderRightActions={renderRightActions} onSwipeableOpen={(direction) => {
                    console.log("Swipped..", direction);
                    if (direction === 'left') {
                        removeFromWish(item.id)
                    }
                    else if (direction === 'right'){
                        addToCart(item)
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
                        <TouchableOpacity onPress={() => addToCart(item)}>
                            <FontAwesome name='shopping-cart' size={24} color="green" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeFromWish(item.id)}>
                            <FontAwesome name='trash' size={24} color="red" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {wish.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No products in the wishlist <AntDesign name="heart" size={25} style={{ color: "black" }} /></Text>
                </View>
            ) : (
                <FlatList
                    data={wish}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.removeAllButton} onPress={removeAllFromWish}>
                    <Text style={styles.removeAllButtonText}>Remove All</Text>
                </TouchableOpacity>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
                    
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
    actionsContainer: {
        padding: 20,
        shadowColor: '#bdbdbd',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.01,
        shadowRadius: 5,
        elevation: 3,
    },
    removeAllButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        margin: 20,
    },
    totalContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(225,225,225,0.1)',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    removeAllButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    actionText: {
        color: 'white',
        fontWeight: 'bold',
        padding: 10,
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

export default ApiWishList;
