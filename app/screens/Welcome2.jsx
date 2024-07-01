// Welcome2.js
import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Settings from "./Settings";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CartProvider from "../context/cartContext";
import WishProvider from "../context/wishContext";
import ApiCartList from "../../components/api_activity/ApiCartList";
import CartIconWithBadge from "../common/CartIconWithBadge";
import ProfileScreen from "./ProfileScreen";
import { FontAwesome } from '@expo/vector-icons';
import ApiWishList from "../../components/api_activity/ApiWishList";
import WishIconWithBadge from "../common/WishIconWithBadge";
import { Switch } from "react-native";
import { LayoutProvider } from "../hooks/switchingColumn";
import { LayoutContext } from "../hooks/switchingColumn";



const Tab = createBottomTabNavigator();

const Welcome2 = ({ ChangeHandler, userProfileData, navigation }) => {
  const [isWishlistTabVisible, setWishlistTabVisible] = useState(false);
  const { layout, toggleLayout } = useContext(LayoutContext);
  const onChange = () => {
    toggleLayout();
  };

  const screenOptions = {

    headerRight: () => (

      <View style={styles.aboveIconContainer}>
      <Switch
        checkedChildren="2 co"
        unCheckedChildren="1 co"
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor="#f4f3f4"
        value={layout.isTwoColumn}
        onValueChange={onChange}
        style={styles.switch}
      />

      <TouchableOpacity onPress={toggleLayout} style={styles.iconButton}>
        <AntDesign name="pluscircleo" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setWishlistTabVisible(prevValue => !prevValue)} style={styles.iconButton}>
        <FontAwesome name='heart' size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={ChangeHandler} style={styles.iconButton}>
        <FontAwesome name='sign-out' size={24} color="black" />
      </TouchableOpacity>
    </View>
  ),
  tabBarStyle: {
    height: 80,
    paddingTop: 10,
    paddingBottom: 10
  },
  tabBarItemStyle: {
    marginBottom: 5
  }
  };

  return (
    <NavigationContainer>

      <CartProvider>
        <WishProvider>
          <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: "Home",
                tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
                tabBarIcon: () =>
                  <View>
                    <AntDesign name="home" size={25} style={{ color: "black" }} />
                  </View>,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarActiveBackgroundColor: "white",
                tabBarInactiveBackgroundColor: "white"
              }}
            // initialParams={{ isTwoColumn, toggleLayout }}
            />
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                tabBarLabel: "Dashboard",
                tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
                tabBarIcon: () =>
                  <AntDesign
                    name="dashboard"
                    size={25}
                    style={{ color: "black" }}
                  />,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarActiveBackgroundColor: "white",
                tabBarInactiveBackgroundColor: "white"
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Home}
              options={{
                tabBarLabel: "Settings",
                tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
                tabBarIcon: () =>
                  <AntDesign name="setting" size={25} style={{ color: "black" }} />,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarActiveBackgroundColor: "white",
                tabBarInactiveBackgroundColor: "white"
              }}
            />
            <Tab.Screen
              name="Account"
              component={ProfileScreen}
              options={{
                tabBarLabel: "Account",
                tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
                tabBarIcon: () =>
                  <View>
                    <AntDesign name="user" size={25} style={{ color: "black" }} />
                  </View>,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarActiveBackgroundColor: "white",
                tabBarInactiveBackgroundColor: "white"
              }}
              initialParams={{ ChangeHandler, userProfileData }}
            />
            <Tab.Screen
              name="Cart"
              component={ApiCartList}
              options={({ navigation }) => ({
                tabBarLabel: "Cart",
                tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
                tabBarIcon: () =>
                  <View>
                    <CartIconWithBadge navigation={navigation} />
                  </View>,
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarActiveBackgroundColor: "white",
                tabBarInactiveBackgroundColor: "white"
              })}
            />
            {isWishlistTabVisible && (
              <Tab.Screen
                name="Wishlist"
                component={ApiWishList}
                options={({ navigation }) => ({
                  tabBarLabel: "Wishlist",
                  tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
                  tabBarIcon: () =>
                    <View>
                      <WishIconWithBadge navigation={navigation} />
                    </View>,
                  tabBarActiveTintColor: "blue",
                  tabBarInactiveTintColor: "gray",
                  tabBarActiveBackgroundColor: "white",
                  tabBarInactiveBackgroundColor: "white"
                })}
              />
            )}
          </Tab.Navigator>
        </WishProvider>
      </CartProvider>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  aboveIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10
  },
  switch: {
    marginRight: 15
  },
  iconButton: {
    marginRight: 15
  }
})

export default Welcome2;
