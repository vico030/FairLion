import React, {useContext} from "react";
import {BACKEND_URL} from '@env';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../context";
import { MaterialIcons } from '@expo/vector-icons'; 

const SettingsScreen = ({ navigation }) => {
    
    const { signOut } = useContext(AuthContext);

    const alertDelete = () => {
        Alert.alert(
            "Account löschen",
            "Achtung! Möchtest Du deinen FairLION Account wirklich löschen?",
            [
              {
                text: "Abbrechen",
                //onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Ja, Löschen!", onPress: () => deleteProfile() }
            ],
            { cancelable: false }
          );
    }

    const deleteProfile = async () => {
        let userId = await AsyncStorage.getItem('userId');
        console.log(userId)

        let res;
        let requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }

        try{
            res = await fetch(BACKEND_URL + "users/"+userId, requestOptions)
        }
        catch(err) {
            console.log(err);
        }

        if(res.status === 200) {
            Alert.alert("Dein Account wurde gelöscht")
            signOut()
            // navigate to Splash Screen
        }
        else if(res.status === 500) {
            const errMess = await res.json();
            Alert.alert("Fehler", errMess.message);
        }

        
    }

    return(
        <View style={styles.main}>

            <View style={styles.container}>

                <TouchableOpacity style={styles.subMenu}>
                    <Text style={styles.buttonText}>FAQ</Text>
                    <MaterialIcons name="chevron-right" size={24} color="#bbb" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.subMenu}>
                    <Text style={styles.buttonText}>Nutzungsbedingungen</Text>
                    <MaterialIcons name="chevron-right" size={24} color="#bbb" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.subMenu}>
                    <Text style={styles.buttonText}>Datenschutzerklärung</Text>
                    <MaterialIcons name="chevron-right" size={24} color="#bbb" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.subMenuBottom}>
                    <Text style={styles.buttonText}>Über fairLION</Text>
                    <MaterialIcons name="chevron-right" size={24} color="#bbb" />
                </TouchableOpacity>

            </View>

            <View style={styles.container}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => alertDelete()}>
                    <Text style={styles.deleteText}>Account löschen</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const dividerColor = "#ddd";

const styles = StyleSheet.create({
    main: {
        paddingTop: 30,
    },
    container: {
        backgroundColor: "#fff",
        marginBottom: 40,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: dividerColor,
    },
    subMenu: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: dividerColor,
        marginLeft: 15,
    },
    subMenuBottom: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginLeft: 15,
    },
    buttonText: {
        width: "90%",
        fontSize: 16,
        fontWeight: "300",
    }, 
    deleteButton: {
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    deleteText: {
        fontSize: 16,
        color: "red",
    }
});

export default SettingsScreen;