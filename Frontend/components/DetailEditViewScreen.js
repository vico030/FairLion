import React, { useState, useEffect } from "react";
import env from "../env.js";
const { BACKEND_URL } = env;
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Carousel from "./CarouselComponent";
import UserButton from "./UserButton";
import { Alert } from "react-native";

const windowHeight = Dimensions.get("window").height;


const DetailEditViewScreen = ({
  route,
  navigation,
}) => {
  const {
    besitzer,
    images,
    produktName,
    ausleihfrist,
    kategorie,
    beschreibung,
    user,
    articleId,
    borrower
  } = route.params;

  const [borrowerObject, setBorrowerObject] = useState(null)

  async function getBorrower() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    var res;
    var resJson;
    try {
      res = await fetch(
        BACKEND_URL +
        `users/${borrower}`,
        requestOptions
      );
      resJson = await res.json();
    } catch (err) {
      console.log(err);
    }
    if (res.status === 200) {
      setBorrowerObject(await resJson.data);
    }
  }

  const deleteArticle = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    let res;
    let resJson;
    let success;
    try {
      res = await fetch(BACKEND_URL + `articles/${articleId}`, requestOptions);
      resJson = await res.json();
      if (res.status === 200) {
        Alert.alert(success, resJson.message);
        navigation.goBack();
      }
      else {
        success = "Fehler";
        Alert.alert(success, resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getBorrower();
    });
    return unsubscribe;
  }, [navigation]);

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
            <UserButton user={user} navigation={navigation} disabled={true} />
            <TouchableOpacity onPress={()=>{
              deleteArticle()
            }}>
              <Feather
                name="trash"
                size={24}
                color="black"
              />
              {/* <MaterialCommunityIcons
                name="eye-off-outline"
                size={24}
                color="black"
              /> */}
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
            <Text style={styles.elementTextRight}>{ausleihfrist}</Text>
          </View>

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Kategorie:</Text>
            <Text style={styles.elementTextRight}>{kategorie}</Text>
          </View>
        </View>

        {borrowerObject && (<View style={styles.descriptionCard}>
          <View style={styles.items}>
            <Text style={styles.cardHeader}>Ausgeliehen von</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.items}>
            <UserButton user={borrowerObject} navigation={navigation} />
          </View>
        </View>)}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={borrower} style={borrower ? styles.disabledBtn : styles.signUpBtn}
            onPress={() => navigation.navigate("EditItem", {
              titel: produktName,
              beschreibung: beschreibung,
              frist: ausleihfrist,
              kategorie: kategorie,
              images: images,
              articleId: articleId,
            })
            }
          >
            <Text style={styles.loginText}>Bearbeiten</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailEditViewScreen;

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
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  disabledBtn: {
    width: "60%",
    backgroundColor: "#CFCFCF",
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
  }
});
