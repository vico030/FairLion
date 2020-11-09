import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import BorrowedScreen from './components/BorrowedScreen';
// import StockScreen from './components/StockScreen';
// import SearchScreen from './components/SearchScreen';
// import RequestsScreen from './components/RequestsScreen';
// import FriendsScreen from './components/FriendsScreen';
import {BurrowedStackScreen,
  StockStackScreen,
  SearchStackScreen,
  RequestsStackScreen,
  FriendsStackScreen} from './components/Headers';
const activeTintColor = "#E77F23";
const inactiveTintColor = "#333740";
const Tabs = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === 'Ausgeliehen') {
            icon = require(`./assets/ausgeliehen_icon.png`);
          } else if (route.name === 'Lager') {
            icon = require(`./assets/lager_icon.png`);
          }
          else if (route.name === "Suche") {
            icon = require(`./assets/suche_icon.png`);
          }
          else if (route.name === "Anfragen") {
            icon = require(`./assets/anfragen_icon.png`);
          }
          else if (route.name === "Freunde") {
            icon = require(`./assets/freunde_icon.png`);
          }
          return <Image source={icon} tintColor={color} size={size} />
        },
      })}
        tabBarOptions={{
          activeTintColor: activeTintColor,
          inactiveTintColor: inactiveTintColor,
          style: {
            backgroundColor: "#FFFFFF"
          }
        }}
      >
        <Tabs.Screen name="Ausgeliehen" component={BurrowedStackScreen} />
        <Tabs.Screen name="Lager" component={StockStackScreen} />
        <Tabs.Screen name="Suche" component={SearchStackScreen} />
        <Tabs.Screen name="Anfragen" component={RequestsStackScreen} />
        <Tabs.Screen name="Freunde" component={FriendsStackScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "blue",
    fontSize: 50
  }
});*/