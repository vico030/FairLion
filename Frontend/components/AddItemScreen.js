import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Picker } from "@react-native-picker/picker";
import ImageChooser from "./ImageChooser";

const AddItemScreen = ({ navigation }) => {
  const [timeFrame, setTimeFrame] = useState();
  const [category, setCategory] = useState();

  const timeFrameChange = (value) => {
    console.log(value);
  };

  const titleChange = (value) => {
    console.log(value);
  };

  const descriptionChange = (value) => {
    console.log(value);
  };

  const categoryChange = (value) => {
    console.log(value);
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageChooser />

      <View style={styles.itemInfo}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.titleInputText}
            placeholder="Gib einen aussagekräftigen Titel ein"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => titleChange(value)}
          />
        </View>

        <View style={styles.descriptionView}>
          <TextInput
            style={styles.inputText}
            multiline={true}
            placeholder="Beschreibe den Artikel, den du verleihen möchtest"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => descriptionChange(value)}
          />
        </View>

        <View style={styles.datePickerView}>
          <Text style={styles.text}>Wähle einen Zeitraum:</Text>

          <TextInput
            style={styles.timeInputText}
            keyboardType="number-pad"
            placeholder="..."
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => timeFrameChange(value)}
          />

          <View style={styles.datePickerContainer}>
            <Picker
              selectedValue={timeFrame}
              style={styles.datePicker}
              itemStyle={styles.datePickerItems}
              placeholder="Wähle eine Kategorie aus."
              onValueChange={(itemValue, itemIndex) => setTimeFrame(itemValue)}
            >
              <Picker.Item label="Tag(e)" value="tage" />
              <Picker.Item label="Woche(n)" value="wochen" />
              <Picker.Item label="Monat(e)" value="monate" />
            </Picker>
          </View>
        </View>

        <View style={styles.pickerView}>
          <Text style={styles.text}>Wähle eine Kategorie:</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              style={styles.picker}
              itemStyle={styles.pickerItems}
              placeholder="Wähle eine Kategorie aus."
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
              <Picker.Item label="Filme" value="filme" />
              <Picker.Item label="Bücher" value="buecher" />
              <Picker.Item label="Spiele" value="spiele" />
              <Picker.Item label="Musik" value="musik" />
              <Picker.Item label="Elektronik" value="elektronik" />
              <Picker.Item label="Werkzeug" value="werkzeug" />
              <Picker.Item label="Kleidung" value="kleidung" />
              <Picker.Item label="Haushalt" value="haushalt" />
              <Picker.Item label="Sonstiges" value="sonstiges" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Speichern</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  // TITLE INPUT ELEMENT
  itemInfo: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    height: 50,
    justifyContent: "center",
    paddingVertical: 5,
  },
  titleInputText: {
    fontSize: 14,
    height: "100%",
    color: "#000",
    marginHorizontal: 20,
  },

  // DESCRIPTION INPUT ELEMENT
  descriptionView: {
    width: "100%",
    height: 150,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  inputText: {
    fontSize: 14,
    height: "100%",
    color: "#000",
    marginHorizontal: 20,
    textAlignVertical: "top",
  },

  // DATE PICKER ELEMENT
  datePickerView: {
    height: 50,
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
  text: {
    width: "50%",
    fontSize: 14,
    color: "#7E7E7E",
    alignContent: "center",
  },
  timeInputText: {
    height: 37,
    width: "15%",
    textAlign: "center",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
  },
  datePickerContainer: {
    flex: 1,
  },
  datePicker: {
    width: "100%",
    height: 88,
    fontSize: 14,
    color: "#000",
  },
  datePickerItems: {
    fontSize: 14,
    height: 88,
    color: "#000",
  },

  // CATEGORY PICKER ELEMENT
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
    width: "50%",
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

  // SAVE BUTTON ELEMENT
  ButtonContainer: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    width: "80%",
    backgroundColor: "#E77F23",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  saveText: {
    color: "#fff",
    fontSize: 20,
  },
});
