import React , {useState}from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';

var count = 0

export default function Counter(){
    const [count, setCount] = useState(0);

    const [name, setName] = useState('Ashutosh')

    const increment = () => {
        setCount(count + 1)
        console.log(count)
        if (count % 2 == 0){
            setName('Ashutosh')
        }else{
        setName('Acharya')
        }
    }


    return(
        <View style={styles.box}>
            <Text>{name}, Counter : {count}</Text>
            <TouchableOpacity style={styles.button} onPress={increment}>
              <Text style={styles.buttonText}>Increment</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: '#05375a',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      box:{
         
        
      }
})
