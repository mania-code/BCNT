import React from 'react'
import { View, Text, StyleSheet, Dimensions,Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Share from 'react-native-share';
import { smallText,smText } from './Responsive';
import {BackTitalBar} from '../my components/TitalBar';
const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

export default function Grid(props) {


    return (
        <View>
            <View style={styles.mainViewl} >
                <TouchableOpacity style={styles.box} 
                onPress={() => { 
                    props.nav.navigate('Payout')
                }}>
                    <Image source={require('../Assets/withdraw.png')} style={styles.iconImage} />
                    <Text style={styles.testa}>My Payouts</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} 
                onPress={() => { 
                    props.nav.navigate('DirectTeam')
                }}>
                    <Image source={require('../Assets/team.png')} style={styles.iconImage} />
                    <Text style={styles.testa}>Direct Team</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.box} 
                 onPress={() => { 
                    props.nav.navigate('LevelTeam')
                }}>
                    <Image source={require('../Assets/levelTeam.png')} style={styles.iconImage} />
                    <Text style={styles.testa}>Level Team</Text>
                </TouchableOpacity>
                
            </View>
            
            <View style={styles.mainViewl} >
                <TouchableOpacity style={styles.box}
                onPress={() => { 
                    props.nav.navigate('Income')
                }} >
                    <Image source={require('../Assets/money-bag.png')} style={styles.iconImage} />
                    <Text style={styles.testa}>My Income</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} 
                onPress={() => {props.nav.navigate('Request')}}
                >
                    <Image source={require('../Assets/payment.png')} style={styles.iconImage} />
                    <Text style={styles.testa}>Withdraw</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.box} 
                onPress={() => { 
                    props.nav.navigate('RefferEarn')
                }}
                >
                    <Image source={require('../Assets/refferEarn.png')} style={styles.iconImage} />
                    <Text style={styles.testa}>Refer & Earn</Text>
                </TouchableOpacity>
                
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mainViewl: {
        flexDirection: 'row',
        // backgroundColor:'tomato',
        width: '100%',
        height: 'auto',
        marginVertical: 5,
        // paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 5,
        justifyContent: 'space-between',    
    },
    testa: {
        fontSize: smText,
        marginVertical: 5,
        fontWeight: 'bold',
        color: 'black',
    },
    box: {
        width: vw*30,
        // minHeight: 100,
        // height: vh * 15,
        // maxHeight: 200,
        borderRadius:10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        paddingHorizontal:2,
        paddingVertical:5,
    },
    iconImage:{
        width:vw*10,
        height:vw*10,
        resizeMode:'cover',
    }
})