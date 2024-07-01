// useMemo
// -----------------------------
import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";

const UseMemoDemo = () => {
  const [number, setNumber] = useState(1);
  const [theme, setTheme] = useState("dark");
  // const processedResult = processingFunction(number);

  const processedResult = useMemo(
    () => {
      return processingFunction(number);
    },
    [number]
  );

  // obj1 ===  obj2
  const themeStyle = useMemo(() => ({ backgroundColor: theme === "dark" ? "#2C3335" : "#DAE0E2"}), [theme]);

  useEffect(
    () => {
      console.log("====================================");
      console.log("themeStyle Changed...");
      console.log("====================================");
    },
    [themeStyle]
  );

  return (
    <View style={[styles.container, themeStyle]}>
      <Text
        style={{
          padding: 20,
          marginBottom: 40,
          textAlign: "center",
          color: "white",
          backgroundColor: "#1287A5"
        }}
      >
        {processedResult}
      </Text>
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
        <Text style={{ textAlign: "center", color: "white" }}>
          Change theme
        </Text>
      </TouchableOpacity>
    </View>
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

const processingFunction = number => {
  console.log("processingFunction() ......");
  for (let i = 0; i <= 200000000; i++) {}
  return number * 10;
};

export default UseMemoDemo;

// rerender
// some other causeing this component to rerender

/** Memoization */
/** Referential Equality */

// returns the return type of function