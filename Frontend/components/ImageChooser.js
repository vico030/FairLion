import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, Alert, Platform, StyleSheet } from 'react-native';
import ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'

export default function ImageChooser() {
    const [imageSource, setImageSource] = useState(null);

    useEffect(() => {
        (async () => {
            if(Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if(status !== 'granted') {
                    alert('FairLION braucht Berechtigungen für das Hochladen von Bildern')
                }
            }
        })()
    }, []);


    selectImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            })
        }
        catch(error) {
            console.log(error)
        }

        console.log(result)
        if(!result.cancelled) {
            setImageSource(result.uri)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={selectImage}>
                {!imageSource && <MaterialIcons name="add-a-photo" style={styles.icon} size={36} />}
                {imageSource && <Image source={{uri:imageSource}} style={styles.image} />}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingVertical: 10
    },    
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 150,
        borderWidth: 1,
        borderColor: '#C6C6C8',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    image: {
        width: 200,
        height: 150
    },
    icon: {
        color: '#C6C6C8'
    }
})