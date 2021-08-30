import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {BackTitalBar} from '../my components/TitalBar';
import {
  Card,
  Button,
  TextInput,
  withTheme,
  ActivityIndicator,
} from 'react-native-paper';
import {
  smText,
  xsmallText,
  midText,
  largeText,
  mlText,
  xlargeText,
  smallText,
} from '../Components/Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

var TokenAdd = '';


const Request = ({navigation, theme}) => {
  const [Amount, setAmount] = useState('')
  let nonStateId;
  const [id, setId] = useState('');
  const [avlCoin, setavlCoin] = useState('000');
  const [loading, setLoad] = useState(false);

  const {colors} = theme;

  useEffect(() => {
    let cleanV = true;

    if (cleanV) {
      fillData();
    }

    return (cleanV = false);
  }, []);

  const fillData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      const c = JSON.parse(jsonValue);
      setId(c.user_id);
      nonStateId = c.user_id;
    } catch (e) {
      Alert.alert('An error has occurred', e);
    }

    FeatchData();
  };

  const FeatchData = async () => {
    await axios
      .get(
        'https://bcnt.gheeserver.xyz/php_scripts/general.php?userId=' +
          nonStateId,
      )
      .then(function (response) {
        const rarr = response.data;

        setId(rarr[0]);

        setavlCoin(rarr[5]);
      })
      .catch(function (error) {
        alert('Network Issue ' + error);
        console.log(error);
      })
      .then(function () {
        //
      });
  };

  const sendRequest = async (add, amt) => {
    console.log('inside value is ' + add);
    let rem = amt % 500;

    if (TokenAdd.length === 0 || Amount <= 0 || Amount.length === 0) {
      Snackbar.show({
        text: 'Please fill proper details!!',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.secondary,
        textColor: '#FFF',
      });
    } else {
      if (amt > avlCoin) {
        Snackbar.show({
          text: 'You do not have enough Coins.',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      } else if (rem !== 0) {
        Snackbar.show({
          text: 'The amount should be in multiple of 500.',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      } else {
        amt = amt*0.85
        await axios
          .get(
            'https://bcnt.gheeserver.xyz/php_scripts/request.php?userId=' +
              id +
              '&address=' +
              add +
              '&amount=' +
              amt,
          )
          .then(function (response) {
            console.log(response.data);
            let rstring = response.data;
            if (rstring.result == 'Requested Successfully') {
              Snackbar.show({
                text: 'Requested Successfully',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.secondary,
                textColor: '#FFF',
              });
              navigation.goBack();
            } else {
              console.log(rstring.result);
              Alert.alert('Failure', rstring.result);
            }
          })
          .catch(function (error) {
            Alert.alert('Error - ', error.message);
          })
          .finally(() => {
            setLoad(false);
          });
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <BackTitalBar name="Withdrawal" nav={navigation} />
      <View style={{marginTop: 20, width: '95%', alignSelf: 'center'}}>
        <Card style={{marginBottom: 20}}>
          <Card.Title title={'Available Coins - ' + avlCoin} />
        </Card>
        <Card>
          <Card.Title title="Withdrawal Request" />
          <Card.Content>
            <TextInput
              label="Wallet Address"
              mode="outlined"
              onChangeText={x => {
                TokenAdd = x;
              }}
            />
            <TextInput
              label="Amount"
              mode="outlined"
              onChangeText={amount => {
                // console.log('the Amounta is - ' + Amounta);
                Amounta = amount;
                setAmount(amount);
              }}
            />
          </Card.Content>
          <Card.Actions>
            <Button
              style={{width: '40%', marginTop: 10}}
              mode="outlined"
              onPress={() => sendRequest(TokenAdd, Amount)}>
              <Text style={{fontSize: mlText}}>Submit</Text>
            </Button>
          </Card.Actions>
        </Card>
        <Text
          style={{fontSize: xsmallText, color: colors.secondary, marginTop: 5}}>
          *The amount should be in multiple of 500
        </Text>
        <Text
          style={{fontSize: xsmallText, color: colors.secondary, marginTop: 5}}>
          15% Tranction Fee will be deducted. You will get {Amount*0.85 }
        </Text>
      </View>
    </View>
  );
};

export default withTheme(Request);
