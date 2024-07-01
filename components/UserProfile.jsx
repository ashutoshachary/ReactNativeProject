import React , {useEffect, useContext} from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { UserContext } from "./globalState/UserContext";
  
export default function UserProfile() {
  const { user } = useContext(UserContext);
  /** Embedding JavaScript Expressions */




  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: "white", paddingHorizontal: 10 }}>
     <Text>Hello, </Text>
     {user?.isLoggedIn ? user?.email : "Guest"}!
      </Text>
      {isLoggedIn && (
        <View style={{ color: "white", paddingHorizontal: 10 }}>
          <Text style={{ color: "white" }}>Logout</Text>
        </View>
      )}
    </View>
  );
}
