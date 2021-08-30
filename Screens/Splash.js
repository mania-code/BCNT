import React, { useState, useEffect } from 'react';
import { View, Image, Alert, BackHandler, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import dynamicLinks from '@react-native-firebase/dynamic-links';

const SplashScreen = ({ navigation }) => {

  const [net, setNet] = useState(true)

  useEffect(() => {

      // dynamicLinks()
      //   .getInitialLink()
      //   .then(link => {
      //     if (link.url === 'https://www.bcnt.page.link/promo') {
      //     console.log('fas gye');
      //     navigation.navigate('SignUp', {uid:'ADMIN-DADA'} )
      //   }
      //   }).catch(error => {
      //     console.log(error);
      //     setTimeout(() => {
      //       getData(navigation);
      //     }, 2000);
      //   })
  

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setNet(false)
      }else {
        // setTimeout(() => {
        //   getData(navigation);
        // }, 2000);
      }
    });

    setTimeout(() => {
      getData(navigation);
    }, 2000);
    
  })
    

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
    if (c !== null) {
      navigation.replace('Drower');
    }
    else {
      setTimeout(() => {
        navigation.replace('LogIn')
      }, 1000)
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