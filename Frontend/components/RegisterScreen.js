import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext, useReducer } from "react";
import { loginReducer, initialLoginState } from "../reducers/loginReducer";
import { AuthContext } from "../context";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const RegisterScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    phone: "",
    street: "",
    PLZ: "",
    city: "",
    country: "de",
    aboutMe: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const usernameChange = (value) => {
    if (value.length !== 0) {
      setData({
        ...data,
        username: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    setData({
      ...data,
      password: value,
    });
  };

  const handleConfirmPasswordChange = (value) => {
    setData({
      ...data,
      confirm_password: value,
    });
  };

  const handleEmailChange = (value) => {
    setData({
      ...data,
      email: value,
    });
  };

  const handlePhoneChange = (value) => {
    setData({
      ...data,
      phone: value,
    });
  };

  const handleStreetChange = (value) => {
    setData({
      ...data,
      street: value,
    });
  };

  const handlePLZChange = (value) => {
    setData({
      ...data,
      PLZ: value,
    });
  };

  const handleCityChange = (value) => {
    setData({
      ...data,
      city: value,
    });
  };

  const handleCountryChange = (value) => {
    setData({
      ...data,
      country: value,
    });
    console.log(data);
  };

  const handleAboutMEChange = (value) => {
    setData({
      ...data,
      aboutMe: value,
    });
  };

  const handleRegistration = async () => {
    const formdata = new FormData();
    if (data.picture) formdata.append("picture", picture);
    formdata.append("username", data.username);
    formdata.append("password", data.password);
    formdata.append("email", data.email);
    formdata.append("phone", data.phone);
    formdata.append("street", data.street);
    formdata.append("zipCode", data.PLZ);
    formdata.append("city", data.city);
    formdata.append("country", data.country);
    formdata.append("info", data.aboutMe);

    const jsondata = JSON.stringify({
      username: data.username,
      password: data.password,
      email: data.email,
      phone: data.phone,
      street: data.street,
      zipCode: data.PLZ,
      city: data.city,
      country: data.country,
      info: data.aboutMe,
    });
    signUp(jsondata);
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.userInfo}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#7E7E7E"
            autoCapitalize="none"
            onChangeText={(value) => usernameChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Passwort"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => handlePasswordChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Passwort bestätigen"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => handleConfirmPasswordChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email Adresse"
            placeholderTextColor="#7E7E7E"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) => handleEmailChange(value)}
          />
        </View>

        <View style={styles.inputViewLast}>
          <TextInput
            style={styles.inputText}
            placeholder="Telefon (optional)"
            placeholderTextColor="#7E7E7E"
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={(value) => handlePhoneChange(value)}
          />
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Straße und Hausnummer"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => handleStreetChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="PLZ"
            placeholderTextColor="#7E7E7E"
            keyboardType="phone-pad"
            onChangeText={(value) => handlePLZChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Ort"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => handleCityChange(value)}
          />
        </View>

        <View style={styles.picker}>
          <Picker
            selectedValue={data.country}
            style={{ backgroundColor: "#fff", width: "95%", height: 40 }}
            itemStyle={{ justifyContent: "flex-start" }}
            mode={"dropdown"}
            onValueChange={(itemValue, itemIndex) =>
              handleCountryChange(itemValue)
            }
          >
            <Picker.Item label="Deutschland" value="de" />
            <Picker.Item label="Österreich" value="au" />
            <Picker.Item label="Schweiz" value="ch" />
          </Picker>
        </View>
      </View>

      <View style={styles.userPersonalInfo}>
        <View style={styles.inputAboutMeView}>
          <TextInput
            style={styles.inputText}
            placeholder="Über mich..."
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => handleAboutMEChange(value)}
          />
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.signUpBtn} onPress={handleRegistration}>
          <Text style={styles.loginText}>Registrieren</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ScrollView: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  userPersonalInfo: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  inputView: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    height: 50,
    justifyContent: "center",
  },
  inputViewLast: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    height: 50,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 14,
    height: 50,
    color: "#000",
    marginLeft: 20,
  },
  inputAboutMeView: {
    width: "100%",
    height: 150,
  },
  picker: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpBtn: {
    width: "80%",
    backgroundColor: "#E77F23",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
  },
});
