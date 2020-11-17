import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native'

// change profile pic with correct link and not local
export default function  UserButton({userName,image}) {
    return (
        <TouchableOpacity>
            <View style={styles.button}>
                <Image style={styles.profileImage} source={require(`../assets/testprofilpic.jpg`)}/>
                <Text style={styles.buttonText}>{userName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        borderRadius:30,
        paddingVertical:14,
        backgroundColor:'white',
        borderColor:'#e77e23',
        borderWidth:2,
        height:32,
        width:140,
        justifyContent:'center',
        marginBottom:10
    },
    buttonText:{
        fontSize:14,
        textAlign:'center',
        borderColor:'#e77e23',
        alignSelf:'center',
        color:'black',
        left:5
    },
    profileImage:{
        position:'absolute',
        left:3,
        top:2,
        borderRadius:20,
        height:24,
        width:25,
    }

})
