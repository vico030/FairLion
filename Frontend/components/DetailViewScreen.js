import React, { useContext, useState } from "react";
import { BACKEND_URL } from "@env";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "./CarouselComponent";
import UserButton from "./UserButton";
import ArticleContext from "../context"

const windowHeight = Dimensions.get("window").height;

const DetailViewScreen = ({ route, ausleihfrist, images, navigation }) => {
  const { besitzer, produktName, beschreibung, articleId } = route.params;


  const handleLend = async (articleId) => {
    let res;
    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        articleId: "5fe343e3474fc53e1ca4dfd4",
      })
    }

    try{
      res = await fetch(BACKEND_URL + "articleRequest", requestOptions)
    }
    catch(err) {
      console.log(err);
    }

    if(res.status === 201) {
      Alert.alert("Dem Inhaber wurde eine Anfrage gesendet")
    }
    else if(res.status === 500) {
      const errMess = await res.json();
      Alert.alert("Fehler", errMess.message);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Carousel images={images} />

        <View style={styles.titleCard}>
          <View style={styles.items}>
            <Text style={styles.headerText} numberOfLines={2}>
              {produktName}
            </Text>
          </View>

          <View style={styles.items}>
            <UserButton userName={besitzer} navigation={navigation} />
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <View style={styles.items}>
            <Text style={styles.cardHeader}>Beschreibung</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.items}>
            <Text style={{ width: "100%", fontSize: 12 }}>
              {beschreibung}
            </Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.items}>
            <Text style={styles.cardHeader}>Details</Text>
          </View>

          <View style={styles.verticalLineDetails} />

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Ausleihbar für:</Text>
            <Text style={styles.elementTextRight}>3 Woche(n)</Text>
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Kategorie:</Text>
            <Text style={styles.elementTextRight}>Werkzeug</Text>
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Status:</Text>
            <Text style={styles.elementTextRight}>Noch: 13 Stunde(n)</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpBtn} onPress={() => handleLend(articleId)}>
            <Text style={styles.loginText}>Anfragen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailViewScreen;

const styles = StyleSheet.create({
  main: {
    height: windowHeight + 125,
  },
  container: {
    height: windowHeight,
  },
  titleCard: {
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    width: "100%",
    paddingBottom: 10,
  },
  items: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionCard: {
    backgroundColor: "#fff",
    marginTop: 6,
    padding: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: "bold",
    width: "100%",
  },
  detailsCard: {
    backgroundColor: "#fff",
    marginTop: 6,
    padding: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  element: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  elementTextLeft: {
    fontSize: 12,
  },
  elementTextRight: {
    fontSize: 12,
    textAlign: "right",
  },
  verticalLine: {
    borderBottomColor: "#CFCFCF",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  verticalLineDetails: {
    borderBottomColor: "#CFCFCF",
    borderBottomWidth: 1,
    marginTop: 10,
  },

  signUpBtn: {
    width: "60%",
    backgroundColor: "#E77F23",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
