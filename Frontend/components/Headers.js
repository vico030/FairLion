import React from "react";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  Feather,
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
import AddItemScreen from "./AddItemScreen";
import ProfileScreen from "./ProfileScreen";
import HinzufügenScreen from "./HinzufügenScreen";
import DetailViewScreen from "./DetailViewScreen";
import { Header } from "react-native/Libraries/NewAppScreen";
import EditItemScreen from "./EditItemScreen";
import SettingsScreen from "./SettingsScreen";
import EditProfileScreen from "./EditProfileScreen";
import { ForgotPasswordScreen } from "./ForgotPasswordScreen";
import { ChangePasswordScreen } from "./ChangePasswordScreen";
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
const SettingsStack = createStackNavigator();
const EditProfileStack = createStackNavigator();
const ForgotPasswordStack = createStackNavigator();
const ChangePasswordStack = createStackNavigator();

function ProfileStackScreen({ navigation }) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profil",
          headerStyle: {
            backgroundColor: inactiveTintColor,
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto",
          },
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.goBack()}
              tintColor={"white"}
            />
          ),
        }}
      />
      <ProfileStack.Screen
        name="Details"
        component={DetailViewScreen}
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
    <FriendsStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profil",
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


    <FriendsStack.Screen
      name="ReturnDetails"
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
      }}
    />
    <FriendsStack.Screen
      name="ViewDetails"
      component={DetailViewScreen}
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
    <RequestStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profil",
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

    <RequestStack.Screen
      name="ReturnDetails"
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
      }}
    />
    <RequestStack.Screen
      name="ViewDetails"
      component={DetailViewScreen}
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
    <BurrowedStack.Screen
      name="ReturnDetails"
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
      }}
    />
    <BurrowedStack.Screen
      name="ViewDetails"
      component={DetailViewScreen}
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
      }}
    />
    <BurrowedStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profil",
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
            onPress={() => navigation.navigate("AddItem")}
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
    <StockStack.Screen
      name="StockDetails"
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

        /* headerRight: () => (
          <Feather
            name="trash"
            style={styles.rightIcon}
            size={22}
            color="black"
            onPress={()=> {}}
          />
        ), */
      }}
    />
    <StockStack.Screen
      name="ReturnDetails"
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
      }}
    />
    <StockStack.Screen
      name="ViewDetails"
      component={DetailViewScreen}
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
      }}
    />
    <StockStack.Screen
      name="AddItem"
      component={AddItemScreen}
      options={{
        title: "Artikel hinzufügen",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        /* headerRight: () => (
              <MaterialIcons
                name="close"
                size={28}
                style={styles.rightIcon}
                onPress={() => navigation.goBack()}
              />
            ), */
      }}
    />

    <StockStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profil",
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

    <StockStack.Screen
      name="EditItem"
      component={EditItemScreen}
      options={{
        title: "Bearbeiten",
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

    <SearchStack.Screen
      name="ReturnDetails"
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
      }}
    />
    <SearchStack.Screen
      name="ViewDetails"
      component={DetailViewScreen}
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
      }}
    />

    <SearchStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profil",
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

const ForgotPasswordStackScreen = ({ navigation: { goBack } }) => (
  <ForgotPasswordStack.Navigator>
    <ForgotPasswordStack.Screen
      name="Forgot password"
      component={ForgotPasswordScreen}
      options={{
        title: "Passwort zurücksetzen",
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
    ></ForgotPasswordStack.Screen>
  </ForgotPasswordStack.Navigator>
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

function SettingsStackScreen({ navigation }) {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Einstellungen",
          headerStyle: {
            backgroundColor: inactiveTintColor,
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto",
          },
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.goBack()}
              tintColor={"white"}
            />
          ),
        }}
      />
    </SettingsStack.Navigator>
  );
}

function EditProfileStackScreen({ navigation }) {
  return (
    <EditProfileStack.Navigator>
      <EditProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Profil bearbeiten",
          headerStyle: {
            backgroundColor: inactiveTintColor,
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto",
          },
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.goBack()}
              tintColor={"white"}
            />
          ),
        }}
      />
    </EditProfileStack.Navigator>
  );
}

function ChangePasswordStackScreen({ navigation }) {
  return (
    <ChangePasswordStack.Navigator>
      <ChangePasswordStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: "Passwort ändern",
          headerStyle: {
            backgroundColor: inactiveTintColor,
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto",
          },
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.goBack()}
              tintColor={"white"}
            />
          ),
        }}
      />
    </ChangePasswordStack.Navigator>
  )
}

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
  SettingsStackScreen,
  EditProfileStackScreen,
  ForgotPasswordStackScreen,
  ChangePasswordStackScreen,
};
