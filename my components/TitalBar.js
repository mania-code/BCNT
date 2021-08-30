import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {smText,xsmallText,midText,largeText,mlText,xlargeText,smallText} from '../Components/Responsive';

const DrowerTitalBar = (props) => {
    return (
        <View style={styles.mainView}>
            < TouchableOpacity 
            onPress={() => props.nav.openDrawer()}
            style={styles.threeBar}>
                <Icon name="bars" size={30} />
            </TouchableOpacity>
            <View style={styles.header}>
            <Text style={styles.heading}>
                {props.name}
            </Text>
            </View>
        </View>
    )
}

const BackTitalBar = (props) => {
    return (
        <View style={styles.mainView}>
            < TouchableOpacity 
            onPress={() => props.nav.goBack()}
            style={styles.threeBar}>
                <Icon name="arrow-left" size={30} />
            </TouchableOpacity>
            <View style={styles.header}>
            <Text style={styles.heading}>
                {props.name}
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width:'100%',
        height:50,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection:'row',
    },
    threeBar:{
        width:'20%',
        // backgroundColor:'tomato',
        justifyContent:'center',
        alignItems: 'center',
        height: 45,
    },
    header: {
        width:'80%',
        // backgroundColor:'tomato',
        height: 45,
        justifyContent:'center',
        alignItems: 'flex-start',
    },
    heading: {
        fontSize:largeText,
        fontWeight:'bold',
    }

})

export {DrowerTitalBar,BackTitalBar}