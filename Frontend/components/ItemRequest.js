import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import UserButton from "./UserButton";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ItemRequest({
  produktName,
  image,
  navigation,
  declineRequest,
  acceptRequest,
  requestId,
  user,
}) {
  return (
    // change image link to correct parameter url
    <View style={styles.wrapper}>
      <View>
        <Image style={styles.itemImage} source={{ uri: image }} />
      </View>
      <View style={styles.itemBottomView}>
        <View style={styles.items}>
          <Text style={styles.itemName} numberOfLines={1}>
            {produktName}
          </Text>
          <MaterialCommunityIcons
            name="heart-outline"
            size={24}
            style={styles.hiddenIcon}
          />
        </View>
        <View style={styles.items}>
          <UserButton user={user} navigation={navigation} />
          <View style={styles.icons}>
            <TouchableOpacity>
              <AntDesign
                name="check"
                size={24}
                color="green"
                onPress={() => acceptRequest(requestId)}
              />
            </TouchableOpacity>
            {declineRequest &&
              <TouchableOpacity>
                <Feather
                  name="x"
                  size={24}
                  color="red"
                  onPress={() => declineRequest(requestId)}
                />
              </TouchableOpacity>
            }
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
    alignSelf: "stretch",
    width: Dimensions.get("window").width - 5,
    marginVertical: 3,
  },
  itemImage: { height: 90, width: 120 },
  items: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  itemButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E77F23",
    borderRadius: 50,
  },
  itemBottomView: {
    width: Dimensions.get("window").width - 125,
    paddingVertical: 5,
  },
  itemTime: {
    textAlign: "right",
    fontSize: 12,
    width: "45%",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    width: "85%",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 72,
  },
  hiddenIcon: {
    color: "#fff",
  },
});
