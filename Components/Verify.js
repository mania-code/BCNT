import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Linking, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Card, TextInput} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import {
  smText,
  xsmallText,
  midText,
  largeText,
  mlText,
  xlargeText,
  smallText,
} from './Responsive';

export default function Verify({navigation}) {
  const tweet = 'https://twitter.com/BcntGlobal?s=08';
  const insta = 'https://www.instagram.com/bcnt.global/';
  const tele = 'https://t.me/bcnt_global';
  const youtube = 'https://www.youtube.com/channel/UCPHrm8lgOteAF-ABFJXvA_w';

  const [otp, setotp] = useState('');
  const [email, setemail] = useState('');
  const [name, setname] = useState('')
  const [mob, setmob] = useState('')
  const [userId, setUser_id] = useState('');
  const [twitter, settwitter] = useState(0);
  const [instag, setinstag] = useState(0);
  const [teleg, setteleg] = useState(0);
  const [ytu, setytu] = useState(0);
  const [unkid, setunkid] = useState('');

  useEffect(() => {
    setunkid(DeviceInfo.getUniqueId());
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      var c = JSON.parse(jsonValue);
      if (c !== null) {
        setUser_id(c.user_id);
        setemail(c.user_email);
        setmob(c.user_mobile);
        setname(c.user_name);
      } else {
        Alert.alert(
          'Unable to get userid',
          'please update application or reinstall application',
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const verification = async () => {
    if (
      isNaN(otp) ||
      otp.length != 6 ||
      twitter == false ||
      instag == false ||
      teleg == false ||
      ytu == false
    ) {
      if (isNaN(otp) || otp.length != 6) {
        Snackbar.show({
          text: 'OTP should be 6 digits number',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#e66759',
          textColor: '#FFF',
        });
      } else if (twitter == false) {
        Snackbar.show({
          text: 'Please follow us on twitter to continue',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#e66759',
          textColor: '#FFF',
        });
      } else if (instag == false) {
        Snackbar.show({
          text: 'Please follow us on Instagram to continue',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#e66759',
          textColor: '#FFF',
        });
      } else if (teleg == false) {
        Snackbar.show({
          text: 'Please join our telegram channel to continue',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#e66759',
          textColor: '#FFF',
        });
      } else if (ytu == false) {
        Snackbar.show({
          text: 'Please subscribe to our youtube channel to continue',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#e66759',
          textColor: '#FFF',
        });
      }
    } else {
      await axios
        .get(
          'https://gheeson.in/bcnt/php_scripts/V11/verify_mail.php?userid=' +
            userId +
            '&otp=' +
            otp +
            '&imei=' +
            unkid,
        )
        .then(response => {
          if (response.data == 'welcome') {
            const userOjbect = {
              user_id: userId,
              user_name: name,
              user_mobile: mob,
              user_email: email,
              user_verified: true,
            };

            const storeData = async value => {
              try {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem('userData', jsonValue);
                navigation.replace('Drower');
              } catch (e) {
                Alert.alert(
                  'Data not stored in LocalStorage!!',e
                );
              }
            };

            storeData(userOjbect);
          } else if (response.data == 'Verification failed !!') {
            Snackbar.show({
              text: 'Please Enter Correct OTP',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: '#e66759',
              textColor: '#FFF',
            });
          } else {
            Alert.alert(
              'Something went wrong with your Verification',
              response.data,
            );
          }
        })
        .catch(error => {
          Alert.alert('Server down',error.message)
        })
    }
  };

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: xlargeText,
          fontWeight: 'bold',
          alignSelf: 'center',
          color: '#008DCF',
        }}>
        Complete to Login
      </Text>
      <Card style={{margin: 10}}>
        <Card.Content>
          <Button
            icon="twitter"
            mode="contained"
            style={styles.mediaBtn}
            onPress={() => {
              Linking.openURL(tweet);
              settwitter(1);
            }}>
            Follow on Twitter
          </Button>

          <Button
            icon="telegram"
            mode="contained"
            style={[styles.mediaBtn, {backgroundColor: '#0396de'}]}
            onPress={() => {
              Linking.openURL(tele);
              setteleg(1);
            }}>
            Join Telegram Channel
          </Button>

          <Button
            icon="instagram"
            mode="contained"
            style={[styles.mediaBtn, {backgroundColor: '#e8426c'}]}
            onPress={() => {
              Linking.openURL(insta);
              setinstag(1);
            }}>
            Follow on Intagram
          </Button>

          <Button
            icon="youtube"
            mode="contained"
            style={[styles.mediaBtn, {backgroundColor: '#c31e1d'}]}
            onPress={() => {
              Linking.openURL(youtube);
              setytu(1);
            }}>
            Subscribe to Channel
          </Button>

          <Text style={{fontSize: midText, marginTop: 15}}>
            Verify your Email
          </Text>

          <Text style={{fontSize: smallText}}>{email}</Text>

          <TextInput
            type="outline"
            placeholder="Enter OTP sent on Email"
            style={{height: 50, marginVertical: 15}}
            underlineColor="#008DFC"
            onChangeText={text => setotp(text)}
          />

          <Button mode="contained" onPress={() => verification()}>
            Verify OTP
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mediaBtn: {
    marginVertical: 10,
  },
});
