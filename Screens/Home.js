import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, Dimensions, ScrollView, Alert} from 'react-native';
import {DrowerTitalBar} from '../my components/TitalBar';
import LinearGradient from 'react-native-linear-gradient';
import Profile from '../Components/profile';
import Bigbox from '../Components/bigbox';
import Grid from '../Components/Grid';
import SocialFoot from '../my components/SocialFoot';
import {BackgroundCarousel} from '../my components/ImageSlider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Goal from '../Components/Goal';

const vh = Dimensions.get('window').height;

const images = [
  'https://gheeson.in/bcnt/Assets/s1.png',
  'https:///gheeson.in/bcnt/Assets/s2.png',
  'https:///gheeson.in/bcnt/Assets/s3.png',
];

const Home = ({navigation}) => {
  let nonStateId;

  const [name, setName] = useState('XXXX');
  const [mobile, setMobile] = useState('XXX-XXX-XXX');
  const [email, setemail] = useState('XXXXX-XXX@Gmail.com');
  const [id, setId] = useState('XXXX-XXXX-XXXX');
  const [currentPrice, setcurrentPrice] = useState('00.00$');
  const [avlCoin, setavlCoin] = useState('000');
  const [withdrawed, setwithdrawed] = useState('000');
  const [badge, setbadge] = useState('XXX');

  // useEffect(() => { fillData() });

  useFocusEffect(
    React.useCallback(() => {
      let cleanV = true;

      const fillData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userData');
          const c = JSON.parse(jsonValue);
          if (cleanV) {
            setId(c.user_id);
            nonStateId = c.user_id;
            FeatchData(nonStateId);
          }
        } catch (e) {
          Alert.alert('An error has occurred', e);
        }
      };

      fillData();

      return () => {
        cleanV = false;
      };
    }, []),
  );

  // const fillData = async () => {
  //   let cleanV = true;

  // try {
  //   const jsonValue = await AsyncStorage.getItem('userData');
  //   const c = JSON.parse(jsonValue);
  //   if (cleanV) {
  //     setId(c.user_id);
  //   }
  //   nonStateId = c.user_id;
  // } catch (e) {
  //   Alert.alert('An error has occurred', e);
  // }

  //   if (cleanV) {
  //     FeatchData();
  //   }

  //   return () => {
  //     cleanV = false;
  //   };
  // };

  const FeatchData = async nonStateId => {
    await axios
      .get(
        'https://gheeson.in/bcnt/php_scripts/general.php?userId=' +
          nonStateId,
      )
      .then(function (response) {
        const rarr = response.data;

        setId(rarr[0]);
        setName(rarr[1]);
        setemail(rarr[2]);
        setMobile(rarr[3]);
        setcurrentPrice(rarr[4]);
        setavlCoin(rarr[5]);
        setbadge(rarr[7]);
        if (rarr[6] == null) {
          setwithdrawed('000');
        } else {
          // let temp  = rarr[6] * 100;
          // let final = temp/85;
          let final = rarr[6];
          setwithdrawed(final);
          // setwithdrawed(rarr[6]);
        }
      })
      .catch(function (error) {
        alert('Network Issue ' + error);
        console.log(error);
      })
      .then(function () {
        //
      });
  };

  return (
    <View style={{flex: 1}}>
      <DrowerTitalBar nav={navigation} name="Home" />
      <LinearGradient
        colors={['#fff', '#4286f4', '#4286f4']}
        style={{with: '100%', height: vh}}>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <Profile
            name={name}
            id={id}
            mobile={mobile}
            email={email}
            badge={badge}
          />
          <Bigbox
            currentPrice={currentPrice}
            avlCoin={avlCoin}
            withdrawed={withdrawed}
          />
          <Grid nav={navigation} />
          <Goal id={id} />
          <BackgroundCarousel images={images} />
          <SocialFoot />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Home;
