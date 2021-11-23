import React, {useEffect, useState} from 'react';
import {View, Text, Alert, ScrollView, StyleSheet, Linking} from 'react-native';
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

// var TokenAdd = '';

const Request = ({navigation, theme}) => {
  
  const [Amount, setAmount] = useState('');
  let nonStateId;
  const [TokenAdd, setTokenAdd] = useState('');
  const [id, setId] = useState('');
  const [avlCoin, setavlCoin] = useState('000');
  const [loading, setLoad] = useState(true);
  const [currAdd, setcurrAdd] = useState('');
  const [editables, seteditable] = useState(true);
  const [isOld, setisOld] = useState(false)
  const {colors} = theme;

  const [socialState, setsocialState] = useState([false,false,false,false])
  const [twitter, settwitter] = useState(0);
  const [instag, setinstag] = useState(0);
  const [teleg, setteleg] = useState(0);
  const [ytu, setytu] = useState(0);
  const tweet = 'https://twitter.com/BcntGlobal?s=08';
  const insta = 'https://www.instagram.com/bcnt.global/';
  const tele = 'https://t.me/bcnt_global';
  const youtube = 'https://www.youtube.com/channel/UCPHrm8lgOteAF-ABFJXvA_w';

  useEffect(() => {
    let cleanV = true;

    if (cleanV) {
      fillData();
    }

    return (cleanV = false);
  }, []);


  const check_old = async () => {

    await axios.get('https://gheeson.in/bcnt/php_scripts/V13/old_vfy/is_old.php?userId=' + nonStateId)
    .then((response) => {

      if (response.data == "IS OLD") {
        
        setisOld(true);

      }
      else
      {
        console.log(response.data);
      }

    }).catch((error) => {
      Alert.alert("Network Issue" , error.message);
    })

  }

  const fillData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      const c = JSON.parse(jsonValue);
      setId(c.user_id);
      nonStateId = c.user_id;
    } catch (e) {
      Alert.alert('An error has occurred', e);
    }

    check_old();
    FeatchData();
  };

  const checkAll = async () => {

    if (twitter == 1 && instag == 1 && teleg == 1 && ytu == 1) {
      
      await axios.get('https://gheeson.in/bcnt/php_scripts/V13/old_vfy/remove.php?userId=' + id)
    .then((response => {
      console.log(response.data + " sucess");
      setisOld(false);
    }))
    .catch((err) => {
      console.log(err.message);
    })

    }
    else
    {
      Alert.alert("Follw us to continue", "You need to visit our Social handles once to continue further");
    }
  }

  const FeatchData = async () => {
    await axios
      .get(
        'https://gheeson.in/bcnt/php_scripts/general.php?userId=' + nonStateId,
      )
      .then(function (response) {
        const rarr = response.data;

        setId(rarr[0]);
        setcurrAdd(rarr[8]);
        setavlCoin(rarr[5]);
        console.log(rarr[8]);
        if (rarr[8] != 'noAddress') {
          seteditable(false);
          setTokenAdd(rarr[8]);
          console.log(rarr[8]);
        }
      })
      .catch(function (error) {
        alert('Network Issue ' + error);
        console.log(error);
      })
      .finally(function () {
        setLoad(false);
      });
  };

  const sendRequest = async (add, amt) => {
    // console.log('inside value is ' + add);
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
        amt = amt * 0.85;
        await axios
          .get(
            'https://gheeson.in/bcnt/php_scripts/request.php?userId=' +
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
              if (editables == true) {
                axios.get(
                  'https://gheeson.in/bcnt/php_scripts/addAddress.php?userId=' +
                    id +
                    '&newAdd=' +
                    add,
                );
              }
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

  const validate = async (TokenAdd, Amount) => {
    let fist = TokenAdd.charAt(0);
    if (fist == 'T') {
      if (TokenAdd.length == 34) {
        if (isNaN(Amount)) {
          Alert.alert('Invalid Amount', 'Please enter a valid Amount');
        } else {
          if (editables == true) {
            await axios
              .get(
                'https://gheeson.in/bcnt/php_scripts/address_check.php?address=' +
                  TokenAdd,
              )
              .then(response => {
                if (response.data == 'available') {
                  sendRequest(TokenAdd, Amount);
                } else {
                  Alert.alert(
                    'Token alredy in use -',
                    'please use your own token address, One address can used once only',
                  );
                }
              })
              .catch(error => {
                Alert.alert(
                  'Api failure -',
                  'Network not responding to token request ' + error.message,
                );
              });
          }else{
            sendRequest(TokenAdd, Amount);
          }
        }
      } else {
        Alert.alert('Invalid Address', 'Please enter a valid address');
        console.log('Invalid -> ' + TokenAdd.length);
      }
    } else {
      Alert.alert('Invalid Address', 'Please enter a valid address');
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        colors={'tomato'}
        animating={true}
        size="large"
        style={{marginTop: 250}}></ActivityIndicator>
    );
  }

  if(isOld)
  {
    return(
      <ScrollView>
      <Text
        style={{
          fontSize: xlargeText,
          fontWeight: 'bold',
          alignSelf: 'center',
          color: '#008DCF',
        }}>
        Follow us to continue
      </Text>
      <Card style={{margin: 10}}>
        <Card.Content>
          <Button
            disabled={twitter}
            icon="twitter"
            mode="contained"
            style={styles.mediaBtn}
            onPress={() => {
              Linking.openURL(tweet);
              settwitter(1);
            }}
            >
            Follow on Twitter
          </Button>

          <Button
            disabled={teleg}
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
            disabled={instag}
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
            disabled={ytu}
            icon="youtube"
            mode="contained"
            style={[styles.mediaBtn, {backgroundColor: '#c31e1d'}]}
            onPress={() => {
              Linking.openURL(youtube);
              setytu(1);
            }}>
            Subscribe to Channel
          </Button>

          <Button
            mode="outlined"
            onPress={() => {
              checkAll()
            }}>
            Continue to Withdrawal
          </Button>

        </Card.Content>
      </Card>

    </ScrollView>
  );
  }
  else{

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
              <Text> {currAdd != 'noAddress' && 'Saved -' + currAdd} </Text>
              <TextInput
                label="Wallet Address"
                maxLength={34}
                // value={currAdd != 'noAddress' && currAdd}
                mode="outlined"
                editable={editables}
                onChangeText={x => {
                  // setcurrAdd(x)
                  setTokenAdd(x);
                  // TokenAdd = x;
                }}
              />
              <TextInput
                label="Amount"
                mode="outlined"
                onChangeText={amount => {
                  // Amounta = amount;
                  setAmount(amount);
                }}
              />
            </Card.Content>
            <Card.Actions>
              <Button
                style={{width: '40%', marginTop: 10}}
                mode="outlined"
                // onPress={() => sendRequest(TokenAdd, Amount)}>
                onPress={() => validate(TokenAdd, Amount)}>
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
            15% Tranction Fee will be deducted. You will get {Amount * 0.85}
          </Text>
          <Text
            style={{fontSize: xsmallText, color: colors.secondary, marginTop: 5}}>
            **Update only BCNT address, Otherwise your coin will lost.**
          </Text>
        </View>
      </View>
    );

  }
};


const styles = StyleSheet.create({
  mediaBtn: {
    marginVertical: 10,
  },
  bottomView:
  {
    // backgroundColor:'#ccc',
    margin:10,
    // marginTop:50,
    // padding: 5,
  }
});

export default withTheme(Request);
