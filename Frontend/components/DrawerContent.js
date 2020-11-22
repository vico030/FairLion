import React, { useContext } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "./context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function DrawerContent() {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logoImage}
          source={require("../assets/logo.png")}
        />
      </View>
      <View style={styles.logoText}>
        <Text style={styles.fair}>fair</Text>
        <Text style={styles.lion}>LION</Text>
      </View>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.profilButton}>
        <Image
          style={styles.profilImage}
          source={require("../assets/testprofilpic.jpg")}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.profilTextName}>John</Text>
          <Text style={styles.profilTextWohnort}>Berlin Steglitz</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.dividerBottom} />
      <TouchableOpacity style={styles.buttonContainer}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="account"
          size={24}
          color="black"
        />

        <Text style={styles.buttonText}>Profil bearbeiten</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
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
      <TouchableOpacity style={styles.footer}>
        <Text>Impressum & Datenschutz</Text>
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
  divider: {
    width: "80%",
    borderBottomColor: "black",
    borderWidth: 0.5,
  },
  dividerBottom: {
    width: "80%",
    borderBottomColor: "black",
    borderWidth: 0.5,
    marginBottom: 6,
  },
  logoImage: {
    width: 53,
    height: 53,
    marginTop: 29,
  },
  logoText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  fair: {
    fontWeight: "normal",
    fontSize: 20,
    color: "#333740",
  },
  lion: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#E77F23",
  },
  profilButton: {
    marginVertical: 10,
    backgroundColor: "#E77F23",
    width: "100%",
    flexDirection: "row",
  },
  profilImage: {
    height: 49,
    width: 49,
    borderRadius: 49,
    marginVertical: 5,
    marginLeft: "6%",
  },
  profilTextName: {
    color: "white",
    fontWeight: "700",
  },
  profilTextWohnort: {
    color: "white",
    fontWeight: "400",
  },
  rightContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "flex-start",
    marginVertical: 10,
    width: "90%",
  },

  icon: {
    alignSelf: "center",
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 5,
    fontWeight: "300",
  },
});
