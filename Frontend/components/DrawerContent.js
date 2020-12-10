import React, { useContext } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AuthContext } from "./context";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function DrawerContent({ navigation }) {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>

        <Image
          style={styles.logoImage}
          source={require("../assets/logo.png")}
        />

        <View style={styles.logoText}>
          <Text style={styles.fair}>fair</Text>
          <Text style={styles.lion}>LION</Text>
        </View>

      </View>
      
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.profilButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={styles.profilImage}
          source={require("../assets/testprofilpic.jpg")}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.profilTextName}>John</Text>
          <Text style={styles.profilTextWohnort}>Berlin Steglitz</Text>
        </View>
      </TouchableOpacity>

      {/* <View style={styles.divider} /> */}

      <TouchableOpacity style={styles.buttonContainer}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="account"
          size={24}
          color="black"
        />

        <Text style={styles.buttonText}>Profil bearbeiten</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Settings")}
      >
        <MaterialCommunityIcons
          style={styles.icon}
          name="settings"
          size={24}
          color="black"
        />

        <Text style={styles.buttonText}>Einstellungen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={signOut}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="exit-to-app"
          size={24}
          color="black"
        />
        <Text style={styles.buttonText}>Abmelden</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        marginTop: 70,
      },
      android: {
        marginTop: 50,
      },
      default: {
        marginTop: 50,
      },
    }),
  },
  logoImage: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  logoText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fair: {
    fontWeight: "normal",
    fontSize: 30,
    color: "#333740",
  },
  lion: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#E77F23",
  },
  divider: {
    width: "80%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.8,
    marginTop: 10,
    marginBottom: 15,
  },
  profilButton: {
    backgroundColor: "#E77F23",
    width: "100%",
    flexDirection: "row",
  },
  profilImage: {
    height: 49,
    width: 49,
    borderRadius: 49,
    marginVertical: 10,
    marginLeft: 15,
  },
  rightContainer: {
    justifyContent: "center",
    marginLeft: 10,
  },
  profilTextName: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  profilTextWohnort: {
    color: "white",
    fontWeight: "300",
  },

  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  icon: {
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 15,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "300",
  },
});
