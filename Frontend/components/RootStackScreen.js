import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";
import { RegisterStackScreen } from "./Headers";


const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
      
    <RootStack.Screen name="RegisterStackScreen" component={RegisterStackScreen} />
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    
  </RootStack.Navigator>
);

export default RootStackScreen;
