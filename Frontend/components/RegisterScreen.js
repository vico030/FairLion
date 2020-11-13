import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const RegisterScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    phone: "",
    street: "",
    PLZ: "",
    city: "",
    country: "",
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
  };

  const handleAboutMEChange = (value) => {
    setData({
      ...data,
      aboutMe: value,
    });
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
          <DropDownPicker
            items={[
              { label: "Deutschland", value: "de" },
              { label: "Österreich", value: "au" },
              { label: "Schweiz", value: "ch" },
            ]}
            placeholder="Deutschland"
            defaultValue={"de"}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: "#fff", width: "95%" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fff", width: "95%" }}
            zIndex={100000}
            labelStyle={{ color: "#7E7E7E", fontSize: 14 }}
            onChangeItem={(value) => handleCountryChange(value)}
          />
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
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    justifyContent: "center",
    //marginTop: Constants.statusBarHeight,
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
});
