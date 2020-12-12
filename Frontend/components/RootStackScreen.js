import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";
import { RegisterStackScreen, DetailEditViewStackScreen, DetailReturnViewStackScreen, ArticleRequestStackScreen } from "./Headers";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">

    {/* <RootStack.Screen name="ArticleRequestStackScreen" component={ArticleRequestStackScreen} />
    <RootStack.Screen name="DetailReturnViewStackScreen" component={DetailReturnViewStackScreen} />
    <RootStack.Screen name="DetailEditViewStackScreen" component={DetailEditViewStackScreen} />
    <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen name="RegisterStackScreen" component={RegisterStackScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
