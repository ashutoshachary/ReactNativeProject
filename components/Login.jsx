import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground, TextInput } from 'react-native';

export default function Login({ChangeHandler}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLoginPress = () => {
    console.log('Login button pressed');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRegisterPress = () => {
    console.log('Register button pressed');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/image/dog.jpeg')} style={styles.background} imageStyle={styles.backgroundImage}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../assets/image/my logo.png')} />
            <Text style={styles.appName}>NMS Service</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>
            {isRegister && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                />
              </>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            {isRegister && (
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
            )}
            {isRegister ? (
              <TouchableOpacity style={styles.button} onPress={()=>{
                handleRegisterPress
                ChangeHandler()
                }}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={()=>{
                handleLoginPress
                ChangeHandler();
                }}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.toggleButton} onPress={toggleRegister}>
              <Text style={styles.toggleButtonText}>{isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#05375a',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    resizeMode: 'cover',
    marginTop: 60,
    marginBottom: 50,
    borderRadius: 10,
    opacity: 1,
  },
  content: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop: 100,
    marginLeft: 4,
    marginRight: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#05375a',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
  },
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
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#05375a',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
