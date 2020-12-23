import {
  Alert
} from "react-native";

const isValid = (value, type) => {
  if (value === "") {
    console.log(type);
    console.log(value)
    Alert.alert(type + " nicht vorhanden!", "Bitte geben Sie ein " + type + " ein.", [{
      text: 'OK',
      onPress: () => console.log('OK Pressed')
    }], {
      cancelable: true
    });
    return false;
  }
  return true;
}

const isNotEmpty = (array, type) => {
  if (array.length === 0) {
    console.log(type);
    console.log(array)
    Alert.alert(type + " nicht vorhanden!", "Bitte geben Sie ein " + type + " ein.", [{
      text: 'OK',
      onPress: () => console.log('OK Pressed')
    }], {
      cancelable: true
    });
    return false;
  }
  return true;
}

module.exports = {
  isValid,
  isNotEmpty
}