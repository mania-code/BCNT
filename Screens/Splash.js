import React, { useState, useEffect } from 'react';
import { View, Image, Alert, BackHandler, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const SplashScreen = ({ navigation }) => {

  const [net, setNet] = useState(true)
  let currentVersion = DeviceInfo.getVersion();

  useEffect(async() => {

    // BackHandler.addEventListener("hardwareBackPress",  BackHandler.exitApp())

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setNet(false)
      }else {
        //
      }
    });

    await axios.get('https://gheeson.in/bcnt/php_scripts/V7/version_checkV7.php?version=' + currentVersion)
    .then((response) => {
      if(response.data == 'Updated App'){

        Alert.alert('Updated App' , 'To Continue please update your App from play store', 
        [
          { text: "Update", onPress: () =>  Linking.openURL('https://play.google.com/store/apps/details?id=com.bcnt') },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]
        )

      }else if(response.data == 'go ahead'){

        setTimeout(() => {
          getData(navigation);
        }, 2000);

      }else{
        Alert.alert('Version Error' , 'Plesase Updated your app from playstore')
      }
    }).catch(err => {
      Alert.alert('Version Error' , err)
    })

    // return () =>
    //   BackHandler.removeEventListener("hardwareBackPress",  BackHandler.exitApp());
    
  }, [])
    

  // getData(navigation);

  if (!net) {
    Alert.alert(
      "No Internet",
      "It seems like you are not connect to any network or your internet is too slow, plese try again leter",
      [
        { text: "OK", onPress: () => BackHandler.exitApp() }
      ]
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Image source={require('../Assets/LOGO.png')} style={styles.img} />
    </View>
  )
};

export default SplashScreen;

const getData = async (navigation) => {
  try {
    const jsonValue = await AsyncStorage.getItem('userData')
    const c = JSON.parse(jsonValue);
    console.log(JSON.stringify(c))
    if (c == null) {
      console.log('c is null');
      setTimeout(() => {
        navigation.replace('LogIn')    //re active it
        // navigation.replace('Drower')
      }, 1000)
    }
    else {
      if (c.user_verified == true) {
        navigation.replace('Drower');        
      } else {
        navigation.replace('Verify');
      }
    }
  } catch (e) {
    console.log(e)
  }

}

const styles = StyleSheet.create(
  {
    img: {
      width: 180,
      height: 180,
      marginBottom: 30,
  },
  }
)