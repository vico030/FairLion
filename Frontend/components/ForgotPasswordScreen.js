import { BACKEND_URL } from "@env";
import React, { useState } from 'react'
import { Alert } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        occured: false,
        label: ""
    })

    const submitEmail = () => {
        if (!email) return setError({ occured: true, label: "Field cannot be empty." });
        console.log("HALLO")
        fetch(BACKEND_URL + "auth" + "/" + "pwreset", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })
            .then(response => {
                if (response.status === 200) {
                    Alert.aert("Successfully sent new password to your email.");
                    navigation.goBack();
                }
                else {
                    setError({ occured: true, label: "Something went wrong trying to reset your password. Please try later again." })
                }
            })
            .catch(err => setError({ occured: true, label: "Something went wrong trying to reset your password. Please try later again." }))
    }

    return (
        <KeyboardAwareScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
            <View style={styles.view}>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#7E7E7E"
                        autoCapitalize="none"
                        onChangeText={(value) => setEmail(value)}
                        textContentType="emailAddress"
                    />
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.submitBtn} onPress={submitEmail}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {error.occured && Alert.alert(error.label)}
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    inputText: {
        fontSize: 25,
        color: "#000",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    submitBtn: {
        width: "80%",
        backgroundColor: "#E77F23",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    submitText: {
        color: "#fff",
        fontSize: 20,
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
})