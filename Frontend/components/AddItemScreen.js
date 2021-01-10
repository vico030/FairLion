import React, { useState } from "react";
import { BACKEND_URL } from "@env";
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
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { isValid, isNotEmpty } from "../helpers/validation";

const AddItemScreen = ({ navigation }) => {
  const [article, setArticle] = useState({
    images: [],
    durationValue: "",
    durationUnit: "day",
    title: "",
    description: "",
    category: "filme",
  });

  const durationValueChange = (value) => {
    setArticle({
      ...article,
      durationValue: value,
    });
    console.log(article);
  };

  const durationUnitChange = (value) => {
    setArticle({
      ...article,
      durationUnit: value,
    });
    console.log(article);
  };

  const titleChange = (value) => {
    setArticle({
      ...article,
      title: value,
    });
    console.log(article);
  };

  const descriptionChange = (value) => {
    setArticle({
      ...article,
      description: value,
    });
    console.log(article);
  };

  const categoryChange = (value) => {
    setArticle({
      ...article,
      category: value,
    });
    console.log(article);
  };

  const handleImages = (imageUris) => {
    var images = [];
    for (const uri of imageUris) {
      var mime = uri.split(".").pop().toLowerCase();
      const ext = mime;
      if (mime === "jpg") mime = "jpeg"
      const name = Math.floor(Math.random() * Math.floor(999999999999999999999));
      images.push({ "uri": uri, "name": name + "." + ext, "type": "image/" + mime })
    }
    setArticle({
      ...article,
      images: images,
    });
  }

  const submitArticle = async () => {

    const formdata = new FormData();

    if (article.images) {
      for (const image of article.images) {
        //console.log(image);

        formdata.append("images", image);
      }
    }

    //if (article.images) formdata.append("images", picture);
    formdata.append("title", article.title);
    formdata.append("description", article.description);
    formdata.append("duration", article.durationValue + " " + article.durationUnit);
    formdata.append("category", article.category);
    console.log(formdata);


    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      body: formdata,
    };
    var res;
    try {
      res = await fetch(
        BACKEND_URL +
        `users/${await AsyncStorage.getItem("userId")}/ownedArticles`,
        requestOptions
      );
    } catch (err) {
      console.log(err);
    }
    if (res.status === 201) {
    } else if (res.status === 500) {
      const resJson = await res.json();
      Alert.alert(
        "Fehler",
        resJson,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    }
    console.log(res.status);
    console.log(await AsyncStorage.getItem("userId"));
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageChooser handleImages={handleImages} />

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
            onChangeText={(value) => durationValueChange(value)}
          />

          <View style={styles.datePickerContainer}>
            <Picker
              selectedValue={article.durationUnit}
              style={styles.datePicker}
              itemStyle={styles.datePickerItems}
              placeholder="Wähle eine Kategorie aus."
              onValueChange={(itemValue, itemIndex) =>
                durationUnitChange(itemValue)
              }
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
              selectedValue={article.category}
              style={styles.picker}
              itemStyle={styles.pickerItems}
              placeholder="Wähle eine Kategorie aus."
              onValueChange={(itemValue, itemIndex) =>
                categoryChange(itemValue)
              }
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
          onPress={() => {
            if (isNotEmpty(article.images, "Bild")
              && isValid(article.title, "Titel") 
              && isValid(article.description, "Beschreibung") 
              && isValid(article.durationValue, "Zeitraum"))
              submitArticle();
          }}
        >
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
