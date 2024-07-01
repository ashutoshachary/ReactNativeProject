import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ImageBackground } from 'react-native';
import Login from './components/Login';
import Counter from './components/Counter';
import TouchableComp from './components/Touchable';
import InputField from './components/InputField';
import Product from './components/Product';
import Scroll from './components/ScrollV';
import FlatListComponent1 from './components/FlatListView';
import SectionListComponent from './components/SectionListComp';
import CustomButton from './components/CustomButtonComp';
import CustomInputs from './components/CustomInput';
import WelcomeScreen from './components/WelcomeScreeen';
import CartDemo from './components/CartDemo';
import UseMemoDemo from './components/globalState/UseMemoDemo';
import { CartProvider } from './components/OnlyForCart/CartContext1';
import CartDemo1 from './components/OnlyForCart/CartDemo1';
import UseRefDemo from './components/globalState/useRefDemo';
import Welcome from './app/screens/Welcome';
import Welcome2 from './app/screens/Welcome2'
import Welcome3 from './app/screens/Welcome3';
import AppleStyleSwipeableRow from './components/GustureHandler';
import { LayoutProvider } from './app/hooks/switchingColumn';
import CustomInput from './components/NewCustomInput';
import AnimationDemo from './components/AnimationDemo';
export default function App() {

  const [LoginHandler, setLoginHandler] = useState(true)
  const [userProfileData, setUserProfileData] = useState(null);

  const ChangeHandler = () => {
    setLoginHandler(prevValue => !prevValue)
  }
  // const [user, setUser] = useState({});



  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground style={styles.bcimage}>
        <Login />
      </ImageBackground> */}
      {/* <Counter/> */}
      {/* <TouchableComp/> */}
      {/* <InputField/> */}
      {/* {LoginHandler ? <Login ChangeHandler={ChangeHandler}/> : <Product ChangeHandler={ChangeHandler}/>} */}
      {/* <Scroll/> */}
      {/* <FlatListComponent1/> */}
      {/* <SectionListComponent/> */}
      {/* <View style={styles.buttonContainer}>
                <CustomButton
                    title="👨‍💼Primary Rounded"
                    onPress={() => alert('Primary Rounded Button Pressed')}
                    btnKind="rounded"
                    variant="primary"
                    size="md"
                />
                <CustomButton
                    title="Secondary Outlined"
                    onPress={() => alert('Secondary Outlined Button Pressed')}
                    btnKind="outlined"
                    variant="secondary"
                    size="lg"
                />
                <CustomButton
                    title="Small Primary"
                    onPress={() => alert('Small Primary Button Pressed')}
                    btnKind="outlined"
                    variant="primary"
                    size="sm"
                />
            </View> */}
      {/* ----------------------------------- */}
      {/* <View style={styles.container4}>
      <CustomInputs.BasicCustomTextInput />
      <CustomInputs.PasswordInputField />
      <CustomInputs.InputFieldWithIcon />
      <CustomInputs.InputFieldWithLabel />
      <CustomInputs.FloatingLabelInputField />
      <CustomInputs.InputFieldWithValidation />
    </View> */}
      {/* <WelcomeScreen/> */}

      {/* <CartDemo/> */}
      {/* <UseMemoDemo/> */}

      {/* -------------------------------------------- */}

      {/* <CartProvider>
      <View style={styles.container5}>
        <CartDemo1 />
      </View>
    </CartProvider> */}

      {/* --------------------------------------------- */}

      {/* <UseRefDemo/> */}

      {/* <Welcome/> */}


      {/* For appp--------------------------- */}

      <LayoutProvider>
   {LoginHandler ? <Login ChangeHandler={ChangeHandler}  setUserProfileData={setUserProfileData}/> : <Welcome2 ChangeHandler={ChangeHandler} userProfileData={userProfileData} />}

   </LayoutProvider>

      {/* -------------------------------------------- */}

 {/* <SafeAreaView >
  <CustomInput
        type="rounded"
        icon="person"
        placeholder="Username"
        inputType="username"
      />
      <CustomInput
        type="elevation"
        icon="email"
        placeholder="Email"
        inputType="email"
      />
  </SafeAreaView> */}
      

      {/* <Welcome2/> */}
      {/* <Welcome3/> */}


      {/* <AppleStyleSwipeableRow/> */}


      {/* <AnimationDemo/> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bcimage: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
    backgroundColor: '#fff',

  },
  container4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

});



