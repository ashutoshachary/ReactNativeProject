import React, {useState} from 'react';
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
export default function App() {

const [LoginHandler, setLoginHandler] = useState(true)

const ChangeHandler = () =>{
  setLoginHandler(prevValue=>!prevValue)
}
  

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
      <View style={styles.buttonContainer}>
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
            </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bcimage: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
    backgroundColor: '#fff',
  
},

});
