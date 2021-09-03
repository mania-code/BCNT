import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Drower from './Components/Drower';
import LogInScreen from './Screens/LogIN';
import SignUp from './Screens/SignUp';
import SplashScreen from './Screens/Splash';
import DirectTeam from './Components/DirectTeam';
import Income from './Components/Income';
import Payout from './Components/Payout';
import LevelTeam from './Components/LevelTeam';
import Request from './Screens/Request';
import RefferEarn from './Components/RefferEarn';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [decider, setdecider] = useState('Normal');

  // const handleDynamicLink = link => {
  //   // Handle dynamic link inside your own application
  //   if (link.url === 'https://www.bcnt.page.link/promo') {
  //     // ...navigate to your offers screen
  //     console.log('kam ho hya.');
  //   }else{
  //     console.log(link.url);
  //     console.log('kaam nhi hua to pta to chle.');
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //   // When the component is unmounted, remove the listener
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        // if (link.url === 'https://www.bcnt.page.link/promo') {

        setdecider('link');

        const ID = getParameterFromUrl(link.url, 'invitedBy');

       

        storeData(ID)

      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getParameterFromUrl = (url, parm) => {
    var re = new RegExp('.*[?&]' + parm + '=([^&]+)(&|$)');
    console.log(url);
    var match = url.match(re);
    return match ? match[1] : '';
  };

  // const RenderFun = () => {
  //   if (decider == 'link') {
  //     return (
  //       <NavigationContainer>
  //         <Stack.Navigator initialRouteName="SignUp" headerMode="none">
  //           <Stack.Screen name="LogIn" component={LogInScreen} />
  //           <Stack.Screen name="Splash" component={SplashScreen} />
  //           <Stack.Screen name="SignUp" component={SignUp} />
  //           <Stack.Screen name="Drower" component={Drower} />
  //           <Stack.Screen name="DirectTeam" component={DirectTeam} />
  //           <Stack.Screen name="Income" component={Income} />
  //           <Stack.Screen name="Payout" component={Payout} />
  //           <Stack.Screen name="LevelTeam" component={LevelTeam} />
  //           <Stack.Screen name="Request" component={Request} />
  //           <Stack.Screen name="RefferEarn" component={RefferEarn} />
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     );
  //   } else {
  //     return (
  //       <View style={{flex: 1}}>
  //         <Text style={{fontSize: 100}}>App is opened in a Normal way.</Text>
  //       </View>
  //     );
  //   }
  // };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('linkSponsor', value)
    } catch (e) {
      Alert.alert('Somthing wrong with local storage' + e)
    }
  }

  // return <RenderFun></RenderFun>;

  return(
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" headerMode="none">
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Drower" component={Drower} />
            <Stack.Screen name="DirectTeam" component={DirectTeam} />
            <Stack.Screen name="Income" component={Income} />
            <Stack.Screen name="Payout" component={Payout} />
            <Stack.Screen name="LevelTeam" component={LevelTeam} />
            <Stack.Screen name="Request" component={Request} />
            <Stack.Screen name="RefferEarn" component={RefferEarn} />
          </Stack.Navigator>
        </NavigationContainer>
  )
}
