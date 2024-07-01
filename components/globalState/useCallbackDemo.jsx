import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import FlatListComponent1 from "../FlatListView";
import Scroll from "../ScrollV";

const UseCallbackDemo = () => {
  const [number, setNumber] = useState(1);
  const [theme, setTheme] = useState("dark");
  /** Some Api call returning data */
  const getItems = useCallback((num) => {
    return [
      { number: num },
      { number: num * 2 },
      { number: num * 4 },
      { number: num * 8 }
    ];
  }, [theme]);

  const themeStyle = {
    backgroundColor: theme === "dark" ? "#8395A7" : "#535C68"
  };


  return (
    <>
     <View style={[{height: 250, padding: 20, elevation: 40}, themeStyle]} >
        {/* <ScrollViewComponent getItems={getItems}/> */}
      </View>
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#2C3335" : "#DAE0E2" }
      ]}
    >
      <TextInput
        placeholder="Tap to Enter..."
        style={styles.input}
        onChangeText={text => setNumber(parseInt(text))}
        value={number}
        inputMode="numeric"
        keyboardAppearance={theme}
      />
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => {
          setTheme(prevValue => (prevValue === "dark" ? "light" : "dark"));
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Change Theme</Text>
      </TouchableOpacity>
     
    </View>
   
     </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
    width: 300,
    borderWidth: 1,
    padding: 10,
    zIndex: 2
  },
  submitBtn: {
    height: 40,
    backgroundColor: "#00CCCD",
    width: 300,
    borderColor: "#1287A5",
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    padding: 10
  }
});

export default UseCallbackDemo;