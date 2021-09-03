import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Linking} from 'react-native';
import {Card, ProgressBar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function Goal(props) {
  
  const fullplan = 'https://bcnt.gheeserver.xyz/Assets/BCNT%20POSTER.pdf';

  const [NextG, setNextG] = useState('');
  const [joinedDays, setjoinedDays] = useState('')  // can remove this
  const [DaysLeft, setDaysLeft] = useState('')
  const [RewardAmt, setRewardAmt] = useState('');
  const [ReqTeamSize, setReqTeamSize] = useState('');
  const [CurrTeamSizeArr, setCurrTeamSizeArr] = useState(''); // can be removed
  const [GoalSize, setGoalSize] = useState('')
  const [level, setlevel] = useState(0)
  const [ProgressNume, setProgressNume] = useState('')
  const [ProgressValue, setProgressValue] = useState(0)


  const fillValues = (tempb,Arr,joD) => {

    if (tempb === 'NORMAL') {
      
      setNextG('BRONZ');
      setRewardAmt(100)
      let reqts = 5;
      let reqtswd = 10;
      let datlimit = 5;
      let i = 0; 
      
      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])

        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }



    } else if (tempb === 'BRONZ') {
      setNextG('SILVER');
      setRewardAmt(500)
      let reqts = 25;
      let reqtswd = 100;
      let datlimit = 10;
      let i = 1; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        console.log('joD - ' + joD + ' days');
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
 
      } else {
  
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'SILVER') {
      setNextG('GOLD');
      setRewardAmt(1000)
      let reqts = 125;
      let reqtswd = 1000;
      let datlimit = 20;
      let i = 2; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'GOLD') {
      setNextG('PLATINUM');
      setRewardAmt(2500)
      let reqts = 625;
      let reqtswd = 10000;
      let datlimit = 30;
      let i = 3; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'PLATINUM') {
      setNextG('DIAMOND');
      setRewardAmt(5000)
      let reqts = 3125;
      let reqtswd = 100000;
      let datlimit = 45;
      let i = 4; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'DIAMOND') {
      setNextG('DOUBLE DIAMOND');
      setRewardAmt(25000)
      let reqts = 15625;
      let reqtswd = 1000000;
      let datlimit = 60;
      let i = 5; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'DOUBLE DIAMOND') {
      setNextG('TRIPLE DIAMOND');
      setRewardAmt(50000)
      let reqts = 78125;
      let reqtswd = 10000000;
      let datlimit = 90;
      let i = 6; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'TRIPLE DIAMOND') {
      setNextG('CROWN');
      setRewardAmt(100000)
      let reqts = 390625;
      let reqtswd = 100000000;
      let datlimit = 120;
      let i = 7; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'CROWN') {
      setNextG('CROWN AMBASSADOR');
      setRewardAmt(1000000)
      let reqts = 1171875;
      let reqtswd = 1000000000;
      let datlimit = 180;
      let i = 8; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'CROWN AMBASSADOR') {
      setNextG('ROYAL AMBASSADOR');
      setRewardAmt(5000000)
      let reqts = 5859375;
      let reqtswd = 1000000000;
      let datlimit = 365;
      let i = 9; 

      setlevel(i)
      setProgressNume(Arr[i])

      if (joD < datlimit) {
        setDaysLeft(datlimit - joD)
        setReqTeamSize(reqts - Arr[i])
        setGoalSize(reqts)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqts)
      } else {
        setDaysLeft('Unlimited')
        setReqTeamSize(reqtswd - Arr[i])
        setGoalSize(reqtswd)
        Arr[i] == 0 ? setProgressValue(0) : setProgressValue(Arr[i]/reqtswd)
      }


    } else if (tempb === 'ROYAL AMBASSADOR') {
      setNextG('Nothing Left');
      setRewardAmt(0)
      let reqts = 0;
      let reqtswd = 0;
      let datlimit = 0;
      setDaysLeft('Unlimited')
      setReqTeamSize('xxx')
      setProgressValue(1)
    } else {
      console.log(tempb);
      Alert.alert('Badge Error', 'Server Error Plesase Try again');
    }
  };

  useEffect(async () => {
    let cleanV = true;

    const jsonValue = await AsyncStorage.getItem('userData');
    var c = JSON.parse(jsonValue);
    if (c !== null) {
      var user_id = c.user_id;
      await axios.get('https://bcnt.gheeserver.xyz/php_scripts/goal.php?id=' + user_id)
      .then(response => {
        const rarr = response.data;

        if (cleanV) {
          console.log(rarr);
          setCurrTeamSizeArr(rarr)
          setjoinedDays(rarr[10])
          let x = rarr[11];
          fillValues(x,rarr,rarr[10]);
        }

      }).catch(err => {
        Alert.alert('Api error', err.message);
      });
      

    } else {
      console.log('clear local storage and close application'); //todo - logout & close appication
    }

    return () => {
      cleanV = false;
    };
  }, []);

  return (
    <View style={styles.mainView}>
      <Text style={{marginLeft: '3%', fontSize: mlText}}>
        Next Goal : {NextG}
      </Text>
      <Card style={styles.cardView}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.upTag}>
            <Text style={{marginLeft: '3%', fontSize: smText, color: 'white'}}>
              Reward : {RewardAmt} BCNT
            </Text>
          </View>
          <View style={styles.upTag}>
            <Text style={{marginLeft: '3%', fontSize: smText, color: 'white'}}>
              Days Left : {DaysLeft}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: midText}}>
            Add {ReqTeamSize} more members to level {level+1}.
          </Text>
        </View>
        <View>
          <ProgressBar
            progress={ProgressValue}
            // progress={1}
            color="#008DCF"
            style={{marginVertical: 5, width: '90%', alignSelf: 'center'}}
          />
          <Text style={{marginLeft: '5%'}}>{ProgressNume}/{GoalSize}</Text>
        </View>
        <TouchableOpacity
        onPress={() => Linking.openURL(fullplan)}
        >
          <View style={styles.downloadButton}>
            <Text
              style={{
                fontSize: midText,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              View Reward Plan
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    marginVertical: 20,
  },
  cardView: {
    width: '95%',
    alignSelf: 'center',
    overflow: 'hidden',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  upTag: {
    backgroundColor: '#008DCF',
    padding: 2,
    borderRadius: 5,
  },
  downloadButton: {
    marginTop: 25,
    padding: 5,
    borderColor: '#008DCF',
    borderWidth: 2,
    minWidth: '40%',
    width: '50%',
    maxWidth: '60%',
    textAlign: 'center',
    borderRadius: 10,
  },
});
