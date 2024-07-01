import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "./Dashboard";
import Home from "./Home";
import AntDesign from "react-native-vector-icons/AntDesign";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const drawerOptions = {
  drawerLabelStyle: { fontWeight: "bold", fontSize: 15 },
  drawerIcon: ({ focused }) => (
    <AntDesign
      name="home"
      size={25}
      style={{ color: focused ? "blue" : "gray" }}
    />
  ),
  drawerActiveTintColor: "blue",
  drawerInactiveTintColor: "gray",
  drawerActiveBackgroundColor: "white",
  drawerInactiveBackgroundColor: "white",
};

const screenOptions = {
  drawerStyle: {
    backgroundColor: "#c6bdfe", // Corrected hex code
  },
};

const Welcome3 = () => {
  return (
    <NavigationContainer ref={navigation}>
      <Drawer.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={25}
                style={{ color: focused ? "blue" : "gray" }}
              />
            ),
            ...drawerOptions,
          }}
        />
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            drawerLabel: "Dashboard",
            drawerIcon: ({ focused }) => (
              <AntDesign
                name="dashboard"
                size={25}
                style={{ color: focused ? "blue" : "gray" }}
              />
            ),
            ...drawerOptions,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Welcome3;
