import React from 'react'
import { View , StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import {smText,xsmallText,midText,largeText,mlText,xlargeText,smallText} from '../Components/Responsive';

const tweet = "https://twitter.com/BcntGlobal?s=08";
const insta = "https://www.instagram.com/bcnt.global/";
const tele = "https://t.me/bcnt_global";



export default function SocialFoot() {
    return (
        <View style={styles.mainView}>
            <View style={styles.line}></View>
            <View style={styles.SocialBox}>
            <TouchableOpacity 
            onPress={() => Linking.openURL(tweet)} > 
                 <Avatar.Icon size={xlargeText*1.5} style={{backgroundColor:'#fff'}} color='#1DA1F2' icon="twitter" /> 
                  </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => Linking.openURL(insta)} > 
                 <Avatar.Icon size={xlargeText*1.5} style={{backgroundColor:'#fff'}} color='#bc2a8d' icon="instagram" /> 
                  </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => Linking.openURL(tele)} > 
                 <Avatar.Icon size={xlargeText*1.5} style={{backgroundColor:'#fff'}} color='#1DA1F2' icon="telegram" /> 
                  </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        marginVertical:10,
    },
    line:{
        width: '80%',
        height: 3,
        alignSelf:'center',
        backgroundColor:'#FFF',
        borderRadius:5
    },
    SocialBox:{
        marginTop: 20,
        width:'75%',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
    }
})