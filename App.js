import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import CompanyHome from "./screens/CompanyHome.js";
import AddProduct from "./screens/AddProduct.js";
import AddDealer from "./screens/AddDealer.js";
import ProductQR from "./screens/ProductQR.js";
import ProductBarScan from "./screens/ProductBarScan.js";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="CompanyHome" component={CompanyHome} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="AddDealer" component={AddDealer} />
        <Stack.Screen name="ProductQR" component={ProductQR} />
        <Stack.Screen name="ProductBarScan" component={ProductBarScan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
