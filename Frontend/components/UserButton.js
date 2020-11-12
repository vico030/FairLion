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
        height:30,
        width:120,
        justifyContent:'center',
        marginBottom:10
    },
    buttonText:{
        fontSize:16,
        textAlign:'center',
        borderColor:'#e77e23',
        alignSelf:'center',
        color:'black'
    },
    profileImage:{
        position:'absolute',
        left:5,
        top:2,
        borderRadius:20,
        height:25,
        width:25,
    }

})
