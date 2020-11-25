import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import BorrowedScreen from "./BorrowedScreen";
import StockScreen from "./StockScreen";
import SearchScreen from "./SearchScreen";
import RequestsScreen from "./RequestsScreen";
import FriendsScreen from "./FriendsScreen";
import RegisterScreen from "./RegisterScreen";
import DetailEditViewScreen from "./DetailEditViewScreen";
import DetailReturnViewScreen from "./DetailReturnViewScreen";
import ArticleRequestScreen from "./ArticleRequestScreen";
import ProfileScreen from "./ProfileScreen";
import HinzufügenScreen from "./HinzufügenScreen";

const inactiveTintColor = "#333740";
const BurrowedStack = createStackNavigator();
const StockStack = createStackNavigator();
const SearchStack = createStackNavigator();
const RequestStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const DetailEditStack = createStackNavigator();
const DetailReturnStack = createStackNavigator();
const ArticleRequestStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function ProfileStackScreen({ navigation }) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: inactiveTintColor,
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto",
          },
          headerRight: () => (
            <AntDesign
              name="close"
              size={28}
              color="black"
              style={styles.rightIcon}
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeft: () => (
            <MaterialIcons
              name="add"
              size={28}
              style={styles.leftIcon}
              onPress={() => alert("This is a button!")}
            />
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
}

const FriendsStackScreen = ({ navigation }) => (
  <FriendsStack.Navigator>
    <FriendsStack.Screen
      name="Freunde"
      component={FriendsScreen}
      options={{
        title: "Freunde",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerRight: () => (
          <MaterialIcons
            name="add"
            size={28}
            style={styles.rightIcon}
            onPress={() => navigation.navigate("Freunde-Hinzufügen")}
          />
        ),

        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <FriendsStack.Screen
      name="Freunde-Hinzufügen"
      component={HinzufügenScreen}
      options={{
        title: "Hinzufügen",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
      }}
    />
  </FriendsStack.Navigator>
);

const RequestsStackScreen = ({ navigation }) => (
  <RequestStack.Navigator>
    <RequestStack.Screen
      name="Anfragen"
      component={RequestsScreen}
      options={{
        title: "Anfragen",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },

        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </RequestStack.Navigator>
);

const BurrowedStackScreen = ({ navigation }) => (
  <BurrowedStack.Navigator>
    <BurrowedStack.Screen
      name="Ausgeliehen"
      component={BorrowedScreen}
      options={{
        title: "Ausgeliehen",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </BurrowedStack.Navigator>
);
const StockStackScreen = ({ navigation }) => (
  <StockStack.Navigator>
    <StockStack.Screen
      name="Lager"
      component={StockScreen}
      options={{
        title: "Lager",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerRight: () => (
          <MaterialIcons
            name="add"
            size={28}
            style={styles.rightIcon}
            onPress={() => alert("Add Item")}
          />
        ),
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </StockStack.Navigator>
);
const SearchStackScreen = ({ navigation }) => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Suche"
      component={SearchScreen}
      options={{
        title: "Suche",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerRight: () => (
          <MaterialCommunityIcons
            name="dns-outline"
            size={28}
            style={styles.rightIcon}
          />
        ),
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </SearchStack.Navigator>
);

const RegisterStackScreen = ({ navigation: { goBack } }) => (
  <RegisterStack.Navigator>
    <RegisterStack.Screen
      name="Registrieren"
      component={RegisterScreen}
      options={{
        title: "Registrieren",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerLeft: () => (
          <Ionicons
            name="md-arrow-back"
            size={28}
            style={styles.leftIcon}
            onPress={() => goBack()}
          />
        ),
      }}
    />
  </RegisterStack.Navigator>
);

const DetailEditViewStackScreen = ({ navigation: { goBack } }) => (
  <DetailEditStack.Navigator>
    <DetailEditStack.Screen
      name="Details"
      component={DetailEditViewScreen}
      options={{
        title: "Details",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerLeft: () => (
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            style={styles.leftIcon}
            onPress={() => goBack()}
          />
        ),
        headerRight: () => (
          <MaterialCommunityIcons
            name="delete"
            size={28}
            style={styles.rightIcon}
          />
        ),
      }}
    />
  </DetailEditStack.Navigator>
);

const DetailReturnViewStackScreen = ({ navigation: { goBack } }) => (
  <DetailReturnStack.Navigator>
    <DetailReturnStack.Screen
      name="Details"
      component={DetailReturnViewScreen}
      options={{
        title: "Details",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerLeft: () => (
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            style={styles.leftIcon}
            onPress={() => goBack()}
          />
        ),
      }}
    />
  </DetailReturnStack.Navigator>
);

const ArticleRequestStackScreen = ({ navigation: { goBack } }) => (
  <ArticleRequestStack.Navigator>
    <ArticleRequestStack.Screen
      name="Details"
      component={ArticleRequestScreen}
      options={{
        title: "Details",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerLeft: () => (
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            style={styles.leftIcon}
            onPress={() => goBack()}
          />
        ),
      }}
    />
  </ArticleRequestStack.Navigator>
);

const styles = StyleSheet.create({
  leftIcon: {
    color: "#fff",
    marginLeft: 15,
  },
  rightIcon: {
    color: "#fff",
    marginRight: 15,
  },
});

export {
  BurrowedStackScreen,
  StockStackScreen,
  SearchStackScreen,
  RequestsStackScreen,
  FriendsStackScreen,
  RegisterStackScreen,
  DetailEditViewStackScreen,
  DetailReturnViewStackScreen,
  ArticleRequestStackScreen,
  ProfileStackScreen,
};
