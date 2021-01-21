import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { AuthContext } from "../context";
import { isValid } from "../helpers/validation";

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (val) => {
    if (val.length != 0) {
      setUser({
        ...user,
        email: val,
      });
      console.log(val);
    }
  };
  const handlePasswordChange = (val) => {
    setUser({
      ...user,
      password: val,
    });
    console.log(val);
  };

  const handleLogin = (email, password) => {
    signIn(email, password);
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      style={{ height: Dimensions.get("window").height }}
      automaticallyAdjustContentInsets={false}
    >
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

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(email) => handleEmailChange(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Passwort"
            placeholderTextColor="#003f5c"
            onChangeText={(password) => handlePasswordChange(password)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>Passwort vergessen?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            if (isValid(user.email, "Email") && isValid(user.password, "Passwort")) handleLogin(user.email, user.password);
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => {
            navigation.navigate("RegisterStackScreen");
          }}
        >
          <Text style={styles.loginText}>Registrieren</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  logoText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  fair: {
    fontWeight: "normal",
    fontSize: 40,
    color: "#333740",
  },
  lion: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#E77F23",
  },
  inputView: {
    width: "80%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 17,
    height: 50,
    color: "#000",
  },
  forgot: {
    color: "#000",
    fontSize: 11,
    textDecorationLine: "underline",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#E77F23",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  signUpBtn: {
    width: "80%",
    backgroundColor: "#333740",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
  },
});
