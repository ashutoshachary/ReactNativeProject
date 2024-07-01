import { View, Text, SafeAreaView, Animated, StyleSheet, TouchableOpacity } from 'react-native'
import React , {useRef}from 'react'

const AnimationDemo = () => {
    const topValue = useRef(new Animated.Value(1)).current
    const pairValue = useRef(new Animated.ValueXY({x: 1, y:1})).current
  return (
    <View>
      <SafeAreaView>
         {/* <Animated.View style={[styles.square, {width: topValue}]}>

         </Animated.View> */}
          <Animated.View style={[styles.square, {transform: [{translateX: pairValue.x},{translateY:pairValue.y}]}]}>

</Animated.View>
         {/* <TouchableOpacity style={styles.button} onPress={() => {
            Animated.timing(topValue, {
              toValue: 410,
              duration: 4000,
              useNativeDriver: false
            }).start();
 
         }}>
            <Text> Press Me For Animation</Text>
         
         </TouchableOpacity> */}
         <TouchableOpacity style={styles.button} onPress={() => {
            Animated.timing(pairValue, {
              toValue: {x:200,y:90},
              duration: 4000,
              useNativeDriver: false
            }).start();
 
         }}>
            <Text style={{color:'#fff'}}> Press Me For Animation</Text>
         
         </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    square: {
        marginLeft:1,
        width: 100,
        height: 100,
        backgroundColor: 'blue'
  
    },
    button:{
        backgroundColor: '#333',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        alignSelf: 'center'
    }
})

export default AnimationDemo
