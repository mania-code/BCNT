import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Image, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {BackTitalBar} from '../my components/TitalBar';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;


const RefferEarn = ({ navigation }) => {


    const [user_Id, setUser_id] = useState('')
    const [linka, setlinka] = useState('')

    
    useEffect(() => { getData() }, []);

    async function buildLink(x) {
        const link = await dynamicLinks().buildLink({
        //   link: '/promo?invitedBy=' + x,
          link: 'https://com.bcnt?invitedBy=' + x,
          android:{
              packageName: 'com.bcnt'
          },
          // domainUriPrefix is created in your Firebase console
          domainUriPrefix: 'https://bcnt.page.link',
          // optional setup which updates Firebase analytics campaign
      
        }).then((link) =>
        {
            setlinka(link)
            
            const obj = {
                // url: message,
                message: link + '\n\nUse my referral code - "'+  user_Id +'" to get 10 BCNT Coins absolutely free , checkout this awsome application to earn crypto income', 
            }
    
            Share.open(obj)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log(err);
                });
        })
      }

    const reffer = async () => {

        let bb = await buildLink(user_Id)
        // let shareLink = buildLink(user_Id)

        console.log('sasa '+ bb);

        const obj = {
            // url: message,
            message: bb + 'Use my referral code - "'+  user_Id +'" to get 100 BCNT Coins absolutely free , checkout this awsome application to earn crypto income', 
        }

        Share.open(obj)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData')
            var c = JSON.parse(jsonValue);
            if (c !== null) {
                setUser_id(c.user_id)
            }
            else {
                console.log("clear local storage and close application")
            }

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <ScrollView>
                <BackTitalBar name="Level Team" nav={navigation}  />
                <Image source={require('../Assets/teamPlan.jpeg')} style={{ width: vw * 90, height: vw * 144, marginVertical: 20, alignSelf: 'center' }} />

                <View style={styles.providerView}>

                    <Text style={{ width: '90%', textAlign: 'left', fontSize: 22 }}>Your Refferal ID - </Text>

                    <View style={styles.shereBox}>
                        <Text style={styles.shereBoxText}>{user_Id}</Text>
                        <Icon name='share' size={30} color='#34465d' 
                        onPress={() => buildLink(user_Id)}></Icon>
                    </View>
                </View>
        </ScrollView>
    )
}

export default RefferEarn;

const styles = StyleSheet.create({
    header:
    {
        padding: 5,
        fontSize: 35,
        margin: 10,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    providerView:
    {
        paddingTop: 15,
        width: '96%',
        backgroundColor: '#6DAED4',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        overflow: 'hidden',
        marginBottom: 20,
    },
    shereBox:
    {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 10,
        alignSelf: 'center',
    },
    shereBoxText:
    {
        width: '85%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        padding: 5,
        paddingLeft: 15,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
        marginRight: 10,
    }

})
