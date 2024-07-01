import React , {useState}from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';

export default function ApiProduct({product}){
    
   
    return(
        <View style={styles.box}>
          <Text>Product</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box:{
        flex:1,
        justifyContent:'center',
    }
})