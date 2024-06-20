import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View , TouchableHighlight, Alert} from 'react-native';

const InputField = () => {
    const [text, setText] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onChangePassword = (inputPassword) => {
        setPassword(inputPassword)
    }
    const onChangeText = (inputText) => {
        console.log(inputText)
        setText(inputText);
    }

    const onChangeNumber = (inputNumber) => {
        console.log(inputNumber)
        setNumber(inputNumber);
    }

    const onChangeEmail = (inputEmail) => {
        setEmail(inputEmail)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Input Field</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Enter a Email"
                keyboardType='email'
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Enter a text"
                keyboardType='default'
            />

            <TextInput 
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter a number"
                keyboardType="numeric"
            />
            <TextInput 
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                placeholder="Enter Password"
            />
            <TouchableHighlight onPress={() => {
                console.log("TouchableHighlight pressed and the Number is :",number,'the text us:',text,"Email:",email,"Password",password);
            }}
                onLongPress={() => {
                    console.log("Long pressedand the Number is :",number,'the text us:',text)
                    
                }} style={styles.button}>
                <Text style={styles.text}>Submit</Text>
                {/* <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ height: 100, width: 200 }} /> */}
            </TouchableHighlight>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
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
})

export default InputField;
