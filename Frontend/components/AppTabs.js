import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BurrowedStackScreen,
  StockStackScreen,
  SearchStackScreen,
  RequestsStackScreen,
  FriendsStackScreen,
} from "./Headers";

const activeTintColor = "#E77F23";
const inactiveTintColor = "#333740";
const Tabs = createBottomTabNavigator();
export default function AppTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size, horizontal }) => {
          let icon;

          if (route.name === "Ausgeliehen") {
            icon = "home-import-outline";
          } else if (route.name === "Lager") {
            icon = "inbox-multiple-outline";
          } else if (route.name === "Suche") {
            icon = "magnify";
          } else if (route.name === "Anfragen") {
            icon = "bell-ring";
          } else if (route.name === "Freunde") {
            icon = "account-multiple-outline";
          }

          return (
            <MaterialCommunityIcons
              name={icon}
              color={color}
              size={horizontal ? 20 : 25}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: activeTintColor,
        inactiveTintColor: inactiveTintColor,
        style: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tabs.Screen name="Ausgeliehen" component={BurrowedStackScreen} />
      <Tabs.Screen name="Lager" component={StockStackScreen} />
      <Tabs.Screen name="Suche" component={SearchStackScreen} />
      <Tabs.Screen name="Anfragen" component={RequestsStackScreen} />
      <Tabs.Screen name="Freunde" component={FriendsStackScreen} />
    </Tabs.Navigator>
  );
}
