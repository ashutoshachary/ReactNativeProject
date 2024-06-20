import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';


const TouchableComp = () => {
    const [rippleColor, setRippleColor] = useState(randomHexColor());
    const [rippleOverflow, setRippleOverflow] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log("TouchableHighlight pressed");
            }}
                onLongPress={() => {
                    console.log("Long pressed")
                }} >
                <Text style={styles.text}>TouchableOpacity</Text>
            </TouchableOpacity>
            <TouchableHighlight onPress={() => {
                console.log("TouchableHighlight pressed");
            }}
                onLongPress={() => {
                    console.log("Long pressed")
                }} style={styles.button}>
                {/* <Text style={styles.text}>TouchableHighlight</Text> */}
                <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ height: 100, width: 200 }} />
            </TouchableHighlight>
            <TouchableNativeFeedback onPress={() => {
                console.log("TouchableHighlight pressed");
            }}
                onLongPress={() => {
                    console.log("Long pressed")
                }} style={styles.button}>
                <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ height: 100, width: 200 , borderRadius:10 }} />
            </TouchableNativeFeedback>
            <TouchableWithoutFeedback style={styles.button}>
                <Text style={styles.text}>TouchableWithoutFeedback</Text>
            </TouchableWithoutFeedback>

            <TouchableNativeFeedback
        onPress={() => {
          setRippleColor(randomHexColor());
          setRippleOverflow(!rippleOverflow);
        }}
        background={TouchableNativeFeedback.Ripple(
          rippleColor,
          rippleOverflow,
        )}>
        <View style={styles.touchable}>
          <Text style={styles.text}>TouchableNativeFeedback</Text>
        </View>
      </TouchableNativeFeedback>
        </SafeAreaView>
    )
}
const randomHexColor = () => {
    return '#000000'.replace(/0/g, function () {
      return Math.round(Math.random() * 16).toString(16);
    });
  };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
      touchable: {flex: 0.5, borderColor: 'black', borderWidth: 1},
      text: {alignSelf: 'center'},
})

export default TouchableComp;