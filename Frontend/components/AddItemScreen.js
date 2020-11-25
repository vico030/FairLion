import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
  } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker"
import ImageChooser from './ImageChooser';

const AddItemScreen = ({ navigation }) => {
    
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);


  const dateChange = (value) => {
    setShowDatePicker(false)
    if(value.nativeEvent.timestamp) {
      let newDate = new Date(value.nativeEvent.timestamp)
      setDate(newDate)
      console.log(newDate.toDateString)
    }
    // if(Platform.OS === 'ios') setShowDatePicker(true);
  }

  const titleChange = (value) => {
    console.log(value)
  }

  const descriptionChange = (value) => {
    console.log(value)
  }

  const categoryChange = (value) => {
    console.log(value)
  }
  
  return (
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        
        <ImageChooser />
        
        <View style={styles.itemInfo}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Gib einen aussagekräftigen Titel ein"
              placeholderTextColor="#7E7E7E"
              onChangeText={(value) => titleChange(value)}
            />
          </View>
          <View style={styles.descriptionView}>
          <TextInput
            multiline={true}
            maxLength={200}
            style={styles.inputText}
            placeholder="Beschreibe den Artikel, den du verleihen möchtest"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => descriptionChange(value)}
          />
          </View>
          <View style={styles.inputView}>
            
            <TouchableOpacity style={styles.dateBtn} onPress={() => {setShowDatePicker(true)}} title="Ausleihfrist">
              <Text style={{color: '#7E7E7E'}}>{"Ausleihfrist: "+date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              onChange={dateChange}
            />
            )}
          </View>

          <View style={styles.inputView}>
            <DropDownPicker 
              placeholder="Kategorie"
              placeholderStyle={{color: '#ddd'}}
              itemStyle={{justifyContent:'flex-start'}}
              style={styles.dropdownButton}
              //dropDownStyle={styles.dropdown}
              containerStyle={{ height: 40, marginHorizontal: 10 }}
              labelStyle={{ color: "#7E7E7E", fontSize: 14 }}
              items={[
                {label:"Filme", value:"Filme" },
                {label:"Bücher", value:"Bücher"},
                {label:"Spiele", value:"Spiele"},
                {label:"Musik", value:"Musik"},
                {label:"Elektronik", value:"Elektronik"},
                {label:"Werkzeuge", value:"Werkzeuge"},
                {label:"Kleidung", value:"Kleidung"},
                {label:"Musik", value:"Musik"},
                {label:"Haushalt", value:"Haushalt"},
                {label:"Sonstiges", value:"Sonstiges"}
              ]}
              onChangeItem={(item) => categoryChange(item.value)}
            />
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Speichern</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
}

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    marginTop:200,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  },
  descriptionView: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    maxHeight: 200,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 14,
    height: 50,
    color: "#000",
    marginHorizontal: 20,
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
  dropdown: {
    
  },
  dateBtn: {
    backgroundColor: '#fff',
    fontSize: 14,
    alignItems: 'flex-start',
    height: 40,
    width: '60%',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingLeft: 15,
    borderWidth:1,
    borderRadius: 5,
    borderColor: '#ddd'

  }
})