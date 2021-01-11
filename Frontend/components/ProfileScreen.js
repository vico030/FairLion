import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfileInfoBox from "./ProfileInfoBox";
import ProfileStockItemList from "./ProfileStockItemList";
const ProfileScreen = ({
  route,
  navigation,
}) => {

  const {
    name,
    wohnort,
    artikelzahl,
    image,
    friendId,
    strasse,
    plz,
    land,
    info,
    email,
    telefon,
  } = route.params;
  console.log(name)
  return (
    <View style={styles.container}>
      <ProfileInfoBox
        name={name}
        wohnort={wohnort}
        artikelzahl={artikelzahl}
        image={image}
        navigation={navigation}
        friendId={friendId}
        strasse={strasse}
        plz={plz}
        land={land}
        info={info}
        email={email}
        telefon={telefon}
      />
      <ProfileStockItemList
        navigation={navigation}
        friendId={friendId}
        />
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
