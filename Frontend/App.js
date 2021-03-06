import env from "./env.js";
const {BACKEND_URL, IMAGE_URL} = env;
import "react-native-gesture-handler";
import React, { useEffect, useMemo, useReducer } from "react";
import { loginReducer, initialLoginState } from "./reducers/loginReducer";
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";

import RootStackScreen from "./components/RootStackScreen";
import AppTabs from "./components/AppTabs";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./context";
import SplashScreen from "./components/SplashScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View } from "react-native";
import DrawerContent from "./components/DrawerContent";

import { ProfileStackScreen, SettingsStackScreen, EditProfileStackScreen, ChangePasswordStackScreen } from "./components/Headers";
import { Alert } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ props }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      backBehavior="history"
    >
      <Drawer.Screen name="Home" component={AppTabs} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileStackScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordStackScreen} />
    </Drawer.Navigator>
  );
};

const customFonts = {
  Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (email, password) => {
      var user;
      var res;
      // fetch api call to check email and password
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      };
      console.log(BACKEND_URL);
      try {
        res = await fetch(BACKEND_URL + "auth/login", requestOptions);
      } catch (e) {
        console.log(e);
      }
      if (res.status === 200) {
        const resJson = await res.json();
        const data = resJson.data;
        console.log(data);
        AsyncStorage.multiSet([
          ["userId", data._id],
          ["username", data.username],
          ["email", data.email],
          ["phone", data.phone],
          ["street", data.street],
          ["zipCode", data.zipCode],
          ["city", data.city],
          ["country", data.country],
          ["info", data.info],
          ["image", IMAGE_URL+data.image],
          ["friends", JSON.stringify(data.friends)]
        ]);
        console.log(await AsyncStorage.getItem("userId"));
        user = JSON.stringify(data);
        dispatch({type: "LOGIN", user: user});
      }
      else {
        const errMess = await res.json();
        Alert.alert("Error", errMess.message);
      }
    },

    signOut: async () => {
      try {
        await AsyncStorage.multiRemove(["userId", "username", "email", "phone", "street", "zipCode", "city", "country", "info", "friends"]);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },

    signUp: async (data) => {
      var user;
      var res;
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        body: data
      }
      console.log(BACKEND_URL);
      try {
        res = await fetch(BACKEND_URL + "auth/register", requestOptions);
      }
      catch (err) {
        console.log(err);
      }
      if (res.status === 201) {
        const resJson = await res.json();
        const data = resJson.data;
        AsyncStorage.multiSet([
          ["userId", data._id],
          ["username", data.username],
          ["email", data.email],
          ["phone", data.phone],
          ["street", data.street],
          ["zipCode", data.zipCode],
          ["city", data.city],
          ["country", data.country],
          ["info", data.info],
          ["image", IMAGE_URL+data.image]
        ]);
        console.log(await AsyncStorage.getItem("userId"));
        user = JSON.stringify(data);
        dispatch({ type: "LOGIN", user: user });
      }
      else {
        const errMess = await res.json();
        Alert.alert("Error", errMess.message);
      }
    },
  }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let user;
      user = null;
      try {
        user = await AsyncStorage.getItem("userId");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", user: user });
    }, 1000);
  }, []);
  if (loginState.isLoading) {
    return <SplashScreen />;
  }

  if (!isLoaded) return <AppLoading />

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.user ? <DrawerNavigator /> : <RootStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}