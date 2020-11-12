import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";
import RegisterScreen from "./RegisterScreen";


const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    
  </RootStack.Navigator>
);

export default RootStackScreen;
