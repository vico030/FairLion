import React, { useContext, useState, useEffect } from "react";
import env from "../env.js";
const { BACKEND_URL } = env;
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
import FavouritesButton from "./FavouritesButton";
import AsyncStorage from "@react-native-community/async-storage";

const windowHeight = Dimensions.get("window").height;

const DetailViewScreen = ({ route, navigation }) => {
  const { besitzer, produktName, beschreibung, articleId, images, ausleihfrist, kategorie, status, user, favored } = route.params;

  let favoredVar = favored;
  const [requested, setRequested] = useState(false);
  const [article, setArticle] = useState({});
  const [isFavored, setFavored] = useState(favoredVar);

  const handleLend = async () => {
    //console.log(articleId)
    let res;
    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        articleId: articleId,
      })
    }

    try {
      res = await fetch(BACKEND_URL + "articleRequest", requestOptions)
    }
    catch (err) {
      console.log(err);
    }

    if (res.status === 201) {
      Alert.alert(user.username + " wurde eine Anfrage gesendet")
      setRequested(true);
    }
    else if (res.status === 500) {
      const errMess = await res.json();
      Alert.alert("Fehler", errMess.message);
    }
  }

  const fetchArticle = async () => {
    let requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    }
    let res;
    let resJson;
    try {
      res = await fetch(BACKEND_URL + `users/${await AsyncStorage.getItem("userId")}`, requestOptions);
      resJson = await res.json();

    } catch (error) {
      console.log(error);
    }
    if (res.status === 200) {
      console.log(resJson.data.favourites.includes(articleId))
      if (await resJson.data.favourites.includes(articleId)) {
        setFavored(true);
      }
      else {
        setFavored(false);
      }
    }
  }

  const isRequested = async () => {
    let res;
    let requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    }

    try {
      res = await fetch(BACKEND_URL + "articleRequest/pending", requestOptions)
    }
    catch (err) {
      console.log(err);
    }

    if (res.status === 200) {
      let response = await res.json();
      let requestedArticles = response["data"]
      for (let art of requestedArticles) {
        if (art["articleId"] === articleId) {
          setRequested(true);
          return
        }
      }
      setRequested(false);
    }
    else if (res.status === 500) {
      const errMess = await res.json();
      Alert.alert("Fehler", errMess.message);
    }
    else {
      setRequested(false);
    }
  }

  /*   useEffect(() => {
      isRequested();
      fetchArticle();
    }, []); */

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      isRequested();
      fetchArticle();
    });
    return unsubscribe;
  }, [navigation]);

  console.log(isFavored);
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
            <UserButton user={user} navigation={navigation} />
            {/*<FavouritesButton favored={isFavored} articleId={articleId} />*/}
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <View style={styles.items}>
            <Text style={styles.cardHeader}>Beschreibung</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.items}>
            <Text style={{ width: "100%", fontSize: 12 }}>{beschreibung}</Text>
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

          <View style={styles.element}>
            <Text style={styles.elementTextLeft}>Status:</Text>
            <Text style={styles.elementTextRight}>{status}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={requested} style={requested ? styles.disabledBtn : styles.signUpBtn} onPress={() => handleLend()}>
            <Text style={styles.loginText}>{requested ? "Angefragt" : "Anfragen"}</Text>
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
    borderRadius: 15,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  disabledBtn: {
    width: "60%",
    backgroundColor: "#CFCFCF",
    borderRadius: 15,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
