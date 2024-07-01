// Home.js
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ApiProductList from "../../components/api_activity/ApiProductList";
import { useRoute } from "@react-navigation/native";
// import { isTwoColumn,toggleLayout } from "../hooks/switchingColumn";


const Home = ({  route }) => {
 // const route = useRoute();
  // const { isTwoColumn, toggleLayout } = route.params;
  // const route = useRoute();
  // const {   } = route.params;
  // useEffect(() => {
  //   console.log("Home");
  //   console.log(route.params);

  //   return () => {
  //     // Cleanup
  //   };
  // }, [route]);
  // useEffect(() => {
  //   console.log("isTwoColumn:", isTwoColumn);
  //   console.log("toggleLayout:", toggleLayout);
  // }, [isTwoColumn]);

  return (
    <View style={styles.container}>
      <ApiProductList/>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:'100%'
  },
  text: {
    fontSize: 25
  }
});

export default Home;
