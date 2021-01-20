import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function FriendRequest({ requesterName, city, requestId, acceptRequest, declineRequest, requesterImage }) {
  console.log(requesterImage);
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.profilePicture}
        source={{ uri: requesterImage }}
      />

      <View style={styles.wrapperRight}>
        <View style={styles.upperRowRight}>
          <Text style={styles.requesterName}>{requesterName}</Text>
        </View>
        <View style={styles.bottomRowRight}>
          <Text style={styles.city}>{city}</Text>
          <View style={styles.icons}>
            <AntDesign name="check" size={24} color="green" onPress={() => acceptRequest(requestId)} />
            <Feather name="x" size={24} color="red" onPress={() => declineRequest(requestId)} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 3,
    width: Dimensions.get("window").width - 5,
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginVertical: 5,
    marginLeft: 5
  },
  requesterName: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  city: {
    fontFamily: "Roboto",
    width: 'auto'
  },
  bottomRowRight: {
    marginLeft: 5,
    paddingRight: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperRowRight: {
    marginLeft: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapperRight: {
    justifyContent: "center",
    width: Dimensions.get('window').width - 80,
    paddingHorizontal: 10,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 72,
  },
});
