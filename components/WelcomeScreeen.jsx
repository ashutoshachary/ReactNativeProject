import React,{useState, useContext, useEffect} from 'react';
import { SafeAreaView, StyleSheet,View, Text } from 'react-native';
import MyImage from './ImageComp';
import Login from './Login';
import Product from './Product';
import UserProfile from './UserProfile';
import InputField from './InputField';
UserProfile
const WelcomeScreen = () => {
    // const [LoginHandler, setLoginHandler] = useState(true)
    const [user , setUser] = useState({email:''})


const ChangeHandler = () =>{
  setLoginHandler(prevValue=>!prevValue)
}
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
                
            </View>
            <View style={styles.container2}>
             <UserProfile isLoggedin={true}/>
            </View>
            <View style={styles.container3}>
            <MyImage></MyImage>
            {/* {LoginHandler ? <Login ChangeHandler={ChangeHandler}/> : <Product ChangeHandler={ChangeHandler}/>} */}
            <InputField/>
            </View>
            <View style={styles.container4}>
                
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   container:{
    flex:1,
    
    backgroundColor:'#fff'
   },
   container1:{
     backgroundColor: "green",
     flex:0.5,
   },
   container2:{
      backgroundColor: "yellow",
      flex:1, 
   },
   container3:{
    backgroundColor:"white",
    flex:10,
   },
   container4:{
    backgroundColor:"gray",
    flex:1.3,
   }

})

export default WelcomeScreen;