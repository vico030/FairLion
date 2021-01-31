import env from "../env.js";
const {BACKEND_URL} = env;
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
import { Alert } from "react-native";

const EditItemScreen = ({
  route,
  navigation,
}) => {
  const {
    titel,
    beschreibung,
    frist,
    kategorie,
    images,
    articleId,
  } = route.params;

  const ausleihfrist = frist.match(/\d/g).join("");
  const [durationValue, setDurationValue] = useState(frist.split(" ")[0]);
  const [durationUnit, setDurationUnit] = useState(frist.split(" ")[1]);

  const [title, setTitle] = useState(titel);
  const [description, setDescription] = useState(beschreibung);
  const [category, setCategory] = useState(kategorie);
  const [image, setImage] = useState([]);

  const handleImages = (imageUris) => {
    var images = [];
    for (const uri of imageUris) {
      var mime = uri.split(".").pop().toLowerCase();
      const ext = mime;
      if (mime === "jpg") mime = "jpeg"
      const name = Math.floor(Math.random() * Math.floor(999999999999999999999));
      images.push({ "uri": uri, "name": name + "." + ext, "type": "image/" + mime })
    }
    setImage(images);
  }

  const handleEdit = async () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("duration", durationValue + " " + durationUnit);
    formdata.append("category", category);
    
    //console.log(image);
    if (image.length !== 0) {
      for (const img of image) {
        console.log(img);
        formdata.append("images", img);
      }
    }
    console.log(formdata);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      body: formdata,
    };
    let res;
    let resJson;
    try {
      res = await fetch(BACKEND_URL + "articles/" + articleId, requestOptions);
    } catch (err) {
      console.log(err);
    }
    resJson = await res.json();
    if (res.status === 201) {
      Alert.alert("Erfolg!", resJson.message);
      navigation.navigate("Lager");
    } else {
      Alert.alert("Fehler!", resJson.message);
    }
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageChooser handleImages={handleImages}/>

      <View style={styles.itemInfo}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.titleInputText}
            value={title}
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => setTitle(value)}
          />
        </View>

        <View style={styles.descriptionView}>
          <TextInput
            style={styles.inputText}
            multiline={true}
            value={description}
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => setDescription(value)}
          />
        </View>

        <View style={styles.datePickerView}>
          <Text style={styles.text}>Wähle einen Zeitraum:</Text>

          <TextInput
            style={styles.timeInputText}
            keyboardType="number-pad"
            value={durationValue}
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => setDurationValue(value)}
          />

          <View style={styles.datePickerContainer}>
            <Picker
              selectedValue={durationUnit}
              style={styles.datePicker}
              itemStyle={styles.datePickerItems}
              placeholder="Wähle ein Zeiteinheit aus."
              onValueChange={(itemValue, itemIndex) => setDurationUnit(itemValue)}
            >
              <Picker.Item label="Tag(e)" value="day" />
              <Picker.Item label="Woche(n)" value="week" />
              <Picker.Item label="Monat(e)" value="month" />
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
              placeholder={kategorie}
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
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => handleEdit()}
        >
          <Text style={styles.saveText}>Speichern</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditItemScreen;

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
    marginVertical: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    width: "60%",
    backgroundColor: "#E77F23",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  saveText: {
    color: "#fff",
    fontSize: 20,
  },
});