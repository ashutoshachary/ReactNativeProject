import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';


export default function MyImage(){
    return(
        <View>
            <View style={styles.imgcontainer} >
            <Image source={require('../assets/image/dog.jpeg')} />
            <Image source={require('../assets/image/dog.jpeg')} />
            </View>

            <View>
                <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={{height:100 ,width: 200}}  />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    imgcontainer: {
     
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:'space-between',
      alignItems: 'center',
      padding: 10,
      height: "100px",
      width: "200px",
    },
  });