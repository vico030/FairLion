import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then(value =>
        props.navigation.navigate(
          //value === null ? 'LoginScreen' : 'DrawerNavigationRoutes'
          "RegisterScreen"
        )
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <View>
          <Image
            style={styles.logoImage}
            source={require("../assets/logo.png")}
          />
        </View>
  
        <View style={styles.logoText}>
          <Text style={styles.fair}>fair</Text>
          <Text style={styles.lion}>LION</Text>
        </View>

        <View>
            <Text style={styles.subTitle}>Das faire Verleihsystem!</Text>
        </View>
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
      },
      logoImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginTop: 200
      },
      logoText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 45,
      },
      fair: {
        fontWeight: "normal",
        fontSize: 45,
        color: "#333740",
      },
      lion: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#E77F23",
      },
      subTitle: {
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "200",
        fontSize: 25,
      }
});