import "react-native-gesture-handler";
import React, { useEffect, useMemo, useReducer } from "react";

import { NavigationContainer } from "@react-navigation/native";

import RootStackScreen from "./components/RootStackScreen";
import AppTabs from "./components/AppTabs";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./components/context";
import SplashScreen from "./components/SplashScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View } from "react-native";
import DrawerContent from "./components/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={AppTabs} />
    </Drawer.Navigator>
  );
};

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (username, password) => {
        let userToken;
        userToken = null;
        if (username == "user" && password == "pass") {
          try {
            userToken = "dfadfaf";
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            console.log(e);
          }
        }

        dispatch({ type: "LOGIN", id: username, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {},
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
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
