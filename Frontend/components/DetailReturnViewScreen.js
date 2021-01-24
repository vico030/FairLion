import React, {useState} from "react";
import env from "../env.js";
const {BACKEND_URL} = env;
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

const windowHeight = Dimensions.get("window").height;

const DetailReturnViewScreen = ({ route, navigation }) => {
  const {
    besitzer,
    produktName,
    beschreibung,
    articleId,
    images,
    ausleihfrist,
    kategorie,
    displayRemainingTimeUnit,
    displayRemainingTime,
    user
  } = route.params;
  
  const [returned, setReturned] = useState(false);


  const returnArticle = async () => {
    let articleRequest = await getArticleRequest()
    let requestId = articleRequest["_id"]
    let res;
    let requestOptions = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        status: "returned"
      })
    }

    try{
      res = await fetch(BACKEND_URL + "articleRequest/"+requestId, requestOptions)
    }
    catch(err) {
      console.log(err);
    }

    if(res.status === 201) {
      Alert.alert("Der Artikel wurde an "+user.username+" zurückgegeben")
      setReturned(true)
    }
    else if(res.status === 500) {
      const errMess = await res.json();
      Alert.alert("Fehler", errMess.message);
    }
  }
  
  const getArticleRequest = async () => {
    let res;
    let requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }

    try{
      res = await fetch(BACKEND_URL + "articleRequest/pending", requestOptions)
    }
    catch(err) {
      console.log(err);
    }

    if(res.status === 200) {
      let response = await res.json()
      let articleRequests = response["data"]
      for(let req of articleRequests) {
        if(req["articleId"] === articleId)
          return req;
      }
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
            <UserButton user={user} navigation={navigation} />
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
            {displayRemainingTime < 0 ? (
              <Text style={styles.timeExpired}>Frist abgelaufen!</Text>
            ) : (
              <Text style={styles.elementTextRight}>
                Noch: {displayRemainingTime} {displayRemainingTimeUnit}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={returned} style={returned? styles.disabledBtn:styles.signUpBtn} onPress={() => returnArticle()}>
            <Text style={styles.loginText}>Zurückgeben</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailReturnViewScreen;

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
  timeExpired: {
    fontSize: 12,
    textAlign: "right",
    color: "red",
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
