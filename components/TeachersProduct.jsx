// import React, { useEffect, useContext } from "react";
// import { StyleSheet, View, TouchableOpacity, Text, Image, Animated } from "react-native";
// import { ShoppingContext } from "../context/shoppingContext";
// import { CART_ACTIONS } from "../actions/cartActions";
// import { GestureHandlerRootView, RectButton, Swipeable } from "react-native-gesture-handler"

// const Product = ({ item, isCart }) => {
//   const { dispatchCart } = useContext(ShoppingContext);
//   const { item: product } = item;

//   renderLeftActions = (progress, dragX) => {
//     return (
//       <RectButton style={styles.leftAction} onPress={() => {}}>
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <Text
//             style={[
//               styles.actionText,

//             ]}>
//             Archive
//           </Text>
//         </View>
//       </RectButton>
//     );
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderLeftActions} onSwipeableOpen={(direction) => {
//         console.log("Swipped..", direction);
//       }}>
//         <View style={styles.productContainer}>
//           <View>
//             <Image
//               style={{ width: 200, height: 300 }}
//               source={{
//                 uri: product?.images[0]
//               }}
//             />
//           </View>
//           <Text>{product.title}</Text>
//           <Text>{product.price}</Text>
//           <View style={styles.productActionBtns}>
//             <TouchableOpacity
//               style={styles.submitBtn}
//               onPress={() => {
//                 if (isCart) {
//                   dispatchCart({
//                     type: CART_ACTIONS.REMOVE_FROM_CART,
//                     payLoad: product.id
//                   })
//                 } else {
//                   dispatchCart({
//                     type: CART_ACTIONS.ADD_TO_CART,
//                     payLoad: product
//                   })

//                 }
//               }}
//             >
//               <Text style={{ textAlign: "center", color: "white" }}>{isCart ? "Remove From Cart" : "Add to Cart"}</Text>
//             </TouchableOpacity>
//             {isCart ? null : <TouchableOpacity
//               style={styles.submitBtn}
//               onPress={() => {
//                 dispatch({
//                   type: CART_ACTIONS.ADD_TO_CART,
//                   payLoad: product
//                 })
//               }}
//             >
//               <Text style={{ textAlign: "center", color: "white" }}>Buy Now</Text>
//             </TouchableOpacity>}
//           </View>
//         </View>
//       </Swipeable>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   productContainer: {
//     boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 1px",
//     backgroundColor: "rgb(255, 255, 255)",
//     borderWidth: 1,
//     padding: 15,
//     // marginTop: 15,
//     // marginHorizontal: 15,
//     borderColor: "rgb(225, 232, 238)",
//     alignItems: "stretch",
//     flexBasis: "auto",
//     flexShrink: 0
//   },
//   productActionBtns: {
//     flexDirection: 'row',
//     gap: 10
//   },
//   actionText: {
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   submitBtn: {
//     height: 40,
//     flex: 1,
//     backgroundColor: "#00CCCD",
//     // width: 300,
//     borderColor: "#1287A5",
//     borderRadius: 4,
//     marginTop: 10,
//     borderWidth: 1,
//     padding: 10
//   },
//   leftAction: {
//     backgroundColor: 'white',
//     padding: 20
//   }
// });

// export default Product;