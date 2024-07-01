// Dashboard.js
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Dashboard Screen </Text>
      <Button
        title="Click to navigate to home screen"
        onPress={() => navigation.navigate("Home", {
          param1: "Home",
          param2: 'SomeValue'
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 25
  }
});

export default Dashboard;
