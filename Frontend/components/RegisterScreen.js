import env from "../env.js";
const { BACKEND_URL, IMAGE_URL } = env;
import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext, useReducer } from "react";
import { loginReducer, initialLoginState } from "../reducers/loginReducer";
import { AuthContext } from "../context";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ImageChooser from "./ImageChooser";
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
    image: "",
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

  const handleImages = (imageUris) => {
    var images = [];
    for (const uri of imageUris) {
      var mime = uri.split(".").pop().toLowerCase();
      const ext = mime;
      if (mime === "jpg") mime = "jpeg";
      const name = Math.floor(
        Math.random() * Math.floor(999999999999999999999)
      );
      images.push({ uri: uri, name: name + "." + ext, type: "image/" + mime });
    }
    setData({
      ...data,
      image: images[0],
    });
  };

  const handleRegistration = async () => {
    if (!data.password || !data.confirm_password || (!data.password && !data.confirm_password)) {
      Alert.alert("Fehler", "Es müssen beide Passwort-Felder ausgefüllt sein!");
    } else if (data.password === data.confirm_password) {

      const formdata = new FormData();
      if (data.image !== "") formdata.append("image", data.image);
      formdata.append("username", data.username);
      formdata.append("password", data.password);
      formdata.append("email", data.email);
      formdata.append("phone", data.phone);
      formdata.append("street", data.street);
      formdata.append("zipCode", data.PLZ);
      formdata.append("city", data.city);
      formdata.append("country", data.country);
      formdata.append("info", data.aboutMe);
      // formdata.append("image", data.image);

      signUp(formdata);
    } else {
      Alert.alert("Fehler", "Die Passwörter stimmen nicht überein!");
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageChooser handleImages={handleImages} />

      <View style={styles.userInfo}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#7E7E7E"
            autoCapitalize="none"
            clearButtonMode="while-editing"
            onChangeText={(value) => usernameChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Passwort"
            placeholderTextColor="#7E7E7E"
            clearButtonMode="while-editing"
            onChangeText={(value) => handlePasswordChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Passwort bestätigen"
            placeholderTextColor="#7E7E7E"
            clearButtonMode="while-editing"
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
            clearButtonMode="while-editing"
            onChangeText={(value) => handleEmailChange(value)}
          />
        </View>

        <View style={styles.inputViewLast}>
          <TextInput
            style={styles.inputText}
            placeholder="Telefon"
            placeholderTextColor="#7E7E7E"
            autoCapitalize="none"
            keyboardType="phone-pad"
            clearButtonMode="while-editing"
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
            clearButtonMode="while-editing"
            onChangeText={(value) => handleStreetChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="PLZ"
            placeholderTextColor="#7E7E7E"
            keyboardType="phone-pad"
            clearButtonMode="while-editing"
            onChangeText={(value) => handlePLZChange(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Ort"
            placeholderTextColor="#7E7E7E"
            clearButtonMode="while-editing"
            onChangeText={(value) => handleCityChange(value)}
          />
        </View>

        <View style={styles.pickerView}>
          <Text style={styles.text}>Wähle ein Land:</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={data.country}
              style={styles.picker}
              itemStyle={styles.pickerItems}
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
      </View>

      <View style={styles.userPersonalInfo}>
        <View style={styles.inputAboutMeView}>
          <TextInput
            style={styles.inputAboutMeText}
            multiline={true}
            placeholder="Über mich..."
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => handleAboutMEChange(value)}
          />
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Registrieren</Text>
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
    marginHorizontal: 20,
  },
  inputAboutMeView: {
    width: "100%",
    height: 150,
    paddingVertical: 10,
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
  },
  inputAboutMeText: {
    textAlignVertical: "top",
    fontSize: 14,
    height: 130,
    color: "#000",
    marginHorizontal: 20,
  },
  picker: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "60%",
    backgroundColor: "#E77F23",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  pickerView: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    ...Platform.select({
      ios: {
        height: 88,
        paddingHorizontal: 20,
      },
      android: {
        height: 50,
        paddingHorizontal: 15,
      },
      default: {
        height: 50,
        paddingHorizontal: 15,
      },
    }),
  },
  pickerContainer: {
    //flex: 1,
    width: "65%",
    height: "100%",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 88,
    fontSize: 14,
    color: "#000",
  },
  pickerItems: {
    fontSize: 14,
    height: 88,
    color: "#000",
  },
  text: {
    width: "35%",
    fontSize: 14,
    color: "#7E7E7E",
    alignContent: "center",
  },
});
