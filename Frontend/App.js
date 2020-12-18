import { BACKEND_URL } from "@env";
import "react-native-gesture-handler";
import React, { useEffect, useMemo, useReducer } from "react";
import { loginReducer, initialLoginState } from "./reducers/loginReducer";

import { NavigationContainer } from "@react-navigation/native";

import RootStackScreen from "./components/RootStackScreen";
import AppTabs from "./components/AppTabs";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./context";
import SplashScreen from "./components/SplashScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View } from "react-native";
import DrawerContent from "./components/DrawerContent";

import { ProfileStackScreen, SettingsStackScreen } from "./components/Headers";
import { Alert } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={AppTabs} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (username, password) => {
      var user;
      var res;
      // fetch api call to check username and password
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      };
      try {
        res = await fetch(BACKEND_URL + "auth/login", requestOptions);
      } catch (e) {
        console.log(e);
      }
      if(res.status===200)
      {
        const resJson = await res.json();
        AsyncStorage.setItem("user", JSON.stringify(resJson.data));
        console.log(await AsyncStorage.getItem("user"));
        user = AsyncStorage.getItem("user");
        dispatch({ type: "LOGIN", id: username, token: user });
      }
      else {
        const errMess = await res.json();
        Alert.alert("Error", errMess.message);
      }
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem("user");
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
          "Content-Type": "application/json",
          "Accept": "application/json",
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
      if(res.status===201)
      {
        const resJson = await res.json();
        AsyncStorage.setItem("user", JSON.stringify(resJson.data));
        console.log(await AsyncStorage.getItem("user"));
        user = await AsyncStorage.getItem("user");
        dispatch({ type: "LOGIN", id: data.username, token: user });
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
        user = await AsyncStorage.getItem("user");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: user });
    }, 1000);
  }, []);
  if (loginState.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken ? <DrawerNavigator /> : <RootStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
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
