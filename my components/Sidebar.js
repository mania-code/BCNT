import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {smText,xsmallText,midText,largeText,mlText,xlargeText,smallText} from '../Components/Responsive';

const vh = Dimensions.get("window").height / 100;


const Sidebar = (props) => {

    const Support = 'https://wa.me/917600834324?text=Hello';
    const Privacy = 'https://bcnt.gheeserver.xyz/Assets/Privacy.pdf';
    const Terms = 'https://bcnt.gheeserver.xyz/Assets/Terms.pdf';
    const Wpaper = 'https://bcnt.gheeserver.xyz/Assets/BYTE%20CONNECT.pdf';


    return (
        <View style={{ flex: 1, padding: 0, height: vh * 100, }}>
            <DrawerContentScrollView {...props} style={{ flex: 1, }}>
                <View style={styles.headertop}>
                    <Image source={require('../Assets/LOGO.png')} style={{ width: xlargeText*4, height: xlargeText*4 }} />
                    <Text style={{marginLeft:15,marginTop:10,fontSize:mlText,fontWeight:'bold',color:'#008DCF'}} >BYTE CONNECT</Text>
                </View>
                <View style={{ height: vh * 70 , marginTop:10}}>

                    <DrawerItem
                        icon={() => (<Icon name="paperclip" color='black' size={25} style={{ width: 32 }} />)}
                        label={() => (<Text style={{ fontSize: 17, textAlign: 'left' }} >Whitepaper</Text>)}
                        onPress={() => Linking.openURL(Wpaper)}
                    />                     
                    
                    <DrawerItem
                        icon={() => (<Icon name="user" color='black' size={25} style={{ width: 32 }} />)}
                        label={() => (<Text style={{ fontSize: 17, textAlign: 'left' }} >Terms & Conditions</Text>)}
                        onPress={() => Linking.openURL(Terms)}
                    />                     


                    <DrawerItem
                        icon={() => (<Icon name="shield" color='black' size={25} style={{ width: 32 }} />)}
                        label={() => (<Text style={{ fontSize: 17, textAlign: 'left' }} >Privacy Policy</Text>)}
                        onPress={() => Linking.openURL(Privacy)}
                    />


                    <DrawerItem
                        icon={() => (<Ionicons name="md-chatbox-ellipses-sharp" color='black' size={25} style={{ width: 32 }} />)}
                        label={() => (<Text style={{ fontSize: 17, textAlign: 'left' }} >Help & Support</Text>)}
                        onPress={() => Linking.openURL('mailto:bcntglobal@gmail.com') }
                    />


                    <View style={styles.bottomDrawerSection} >
                        <DrawerItem
                            icon={() => (<Icon name="sign-out" color='#34495e' size={25} style={{ width: 32 }} />)}
                            label={() => (<Text style={{ fontSize: 17, textAlign: 'left', color: '#34495e' }} >Log Out & Exit</Text>)}
                            onPress={() => {
                            const removeValue = async () => {
                                try {
                                    await AsyncStorage.removeItem('userData')
                              } catch (e) {
                                    console.log(e + "can't Log you out")
                                }
                                props.navigation.replace('Splash')
                            }
                            removeValue();
                        }
                        }
                            />
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default Sidebar;

const styles = StyleSheet.create({
    headertop:
    {
        width: '100%',
        // backgroundColor:'tomato',
        height: vh * 25,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        justifyContent: 'center',
        // alignItems:'center',
        paddingLeft: 20,

    },
    bottomDrawerSection: {
        flex: 1,
        marginBottom: 15,
        // height:100,
        justifyContent: 'flex-end',

    },
})