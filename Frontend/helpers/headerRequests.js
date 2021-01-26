import {Alert} from 'react-native'

const alertDeleteArticle = () => {
    Alert.alert(
        "Artikel löschen",
        "Achtung! Möchtest Du diesen Artikel wirklich löschen?",
        [
          {
            text: "Abbrechen",
            //onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Ja!", onPress: () => deleteArticle() }
        ],
        { cancelable: false }
      );
}

const deleteArticle = () => {
    console.log("Deleting Article")
}

module.exports = {
    deleteArticle,
    alertDeleteArticle
}