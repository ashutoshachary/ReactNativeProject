import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground, TextInput, Alert } from 'react-native';

export default function Login({ ChangeHandler, setUserProfileData  }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const validateInputs = () => {
    let valid = true;
    let newErrors = {};

    if (!email) {
      valid = false;
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      valid = false;
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      valid = false;
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      valid = false;
      newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character';
    }

    if (isRegister) {
      if (!name) {
        valid = false;
        newErrors.name = 'Name is required';
      }

      if (!address) {
        valid = false;
        newErrors.address = 'Address is required';
      }

      if (!confirmPassword) {
        valid = false;
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (password !== confirmPassword) {
        valid = false;
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLoginPress = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30,
      })
    })
    .then(res => res.json())
    .then(data => {
      const userProfileData = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
        token: data.token,
        refreshToken: data.refreshToken
      };


      if(email == userProfileData.email && validateInputs()){
      setUserProfileData(userProfileData);
      ChangeHandler();
      }else{
        Alert.alert("Wrong email and password.")
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
 
  

  const handleRegisterPress = () => {
    if (validateInputs()) {
      console.log('Register button pressed');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Address:', address);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
      ChangeHandler();
    }
  };

  const toggleRegister = () => {
    setIsRegister(!isRegister);
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/image/m-img.jpg')} style={styles.background} imageStyle={styles.backgroundImage}>
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
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
              </>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            {isRegister && (
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
            )}
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            {isRegister ? (
              <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
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
    backgroundColor:'#bdbdbd'
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
    borderRadius:25,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    zIndex:2,
    elevation:2,
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
   
  },
  content: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
  errorText: {
    width: '80%',
    color: 'red',
    textAlign: 'left',
    marginTop: -10,
    marginBottom: 10,
    fontSize: 14,
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
