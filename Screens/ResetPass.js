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


const ResetPass = ({navigation, theme}) => {

  const [id, setId] = useState('');
  const [loading, setLoad] = useState(false);
  const [email, setemail] = useState("");
  const [phase, setphase] = useState(0);
  const [otp, setotp] = useState(0);
  const [pass, setpass] = useState('')
  const [conpass, setconpass] = useState('')

  var emailAddress = "";
  emailAddress = email.slice(0,3) + "****" + email.slice(-7)

  const sendOtp = async () =>{
    
    setLoad(true);
    await axios.get('https://gheeson.in/bcnt/php_scripts/V13/reset_pass/sendOtp.php?userId=' + id)
    .then((response) => {
        console.log(response.data);
        if (response.data[0] == "mail sent") {
            
            setemail(response.data[1])
            emailAddress = response.data[1].slice(0,3)
            

            Snackbar.show({
                text:"OTP send to your email",
                duration:Snackbar.LENGTH_LONG,
                backgroundColor: '#e66759',
                textColor: '#FFF',
            })

            setphase(1)

        }
        else if (response.data[0] == "No User found")
        {
            Alert.alert("No User found","Please Enter a valid UserId");
        }
        else{
            Alert.alert("Can't send email", response.data);
        }
    })
    .catch((err) => {
        Alert.alert("Error  in sending Otp" , err.message);
    })
    .finally(() => {
        setLoad(false);
    })

  }

  const verify_otp = async () => {

    setLoad(true);

    await axios.get('https://gheeson.in/bcnt/php_scripts/V13/reset_pass/verify_otp.php?userId='+ id +'&otp=' + otp)
    .then(response =>
        {
            if (response.data == 'Success') {
                
                Snackbar.show({
                    text: 'Email Confirmed!',
                    duration:Snackbar.LENGTH_LONG ,
                    backgroundColor: '#e66759',
                    textColor: '#FFF',
                })

                setphase(2)

            }
            else if (response.data == 'Failed')
            {
                Alert.alert("Wrong OTP", "You have entred wrong OTP, Please enter the latest and correct otp");
            }
        })
    .catch(err => {
        Alert.alert("Something went wrong" , err.message)
    })
    .finally(() => {
        setLoad(false)
    })

  }

  const match_pass = () => {
      if (pass === conpass) {
        update_pass()
      }
      else
      {
          Alert.alert('Password does not match', 'Please enter same password in both fields')
      }
  }

  const update_pass = async () => {

    setLoad(true)

    await axios.get('https://gheeson.in/bcnt/php_scripts/V13/reset_pass/update_pass.php?userId='+ id +'&pass=' + pass )
    .then(response => 
        {
            if (response.data = 'Success') {
                
                Snackbar.show({
                    text: 'Password Updated Successfully!',
                    duration:Snackbar.LENGTH_LONG ,
                    backgroundColor: '#e66759',
                    textColor: '#FFF',
                })

                navigation.navigate('LogIn');

            }else{
                Alert.alert("Something went wrong", response.data)
                navigation.navigate('LogIn');
            }
        })
    .catch(err => Alert.alert('Server Error', err.message))
    .finally(() =>{
        setLoad(false)
    })

  }


  if (loading) {
    return (
      <ActivityIndicator
        colors={'tomato'}
        animating={true}
        size="large"
        style={{marginTop: 250}}></ActivityIndicator>
    );
  }

  if(phase == 0)
  {
    return (
        <View style={{flex: 1}}>
          <BackTitalBar name="Reset Password" nav={navigation} />
          <View style={{marginTop: 20, width: '95%', alignSelf: 'center'}}>
            <Card>
              <Card.Title title="Reset Password" />
              <Card.Content>
                <TextInput
                  label="Enter your UserId"
                  maxLength={10}
                  mode="outlined"
                  onChangeText={x => {
                    setId(x);
                  }}
                />
              </Card.Content>
              <Card.Actions>
                <Button
                  style={{width: '40%', marginTop: 10}}
                  mode="outlined"
                  onPress={() => {sendOtp()}}
                  >
                  <Text style={{fontSize: mlText}}>Send OTP</Text>
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </View>
      );
  }
  else if (phase === 1)
  {
      var line = "OTP sent to " + emailAddress ;

      return(
        <View style={{flex: 1}}>
        <View style={{marginTop: 20, width: '95%', alignSelf: 'center'}}>
          <Card>
            <Card.Title title={line}  />
            <Card.Content>
              <TextInput
                label="Enter 6 digits otp"
                maxLength={6}
                // value={currAdd != 'noAddress' && currAdd}
                mode="outlined"
                onChangeText={x => {
                  setotp(x);
                }}
              />
            </Card.Content>
            <Card.Actions>
              <Button
                style={{width: '40%', marginTop: 10}}
                mode="outlined"
                onPress={() => {verify_otp()}}
                >
                <Text style={{fontSize: mlText}}>Verify OTP</Text>
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
      )
  }
  else if (phase === 2)
  {

    return(
        <View style={{flex: 1}}>
        <View style={{marginTop: 20, width: '95%', alignSelf: 'center'}}>
          <Card>
            <Card.Title title="Reset Password"  />
            <Card.Content>
              <TextInput
                label="Enter new Password here"
                maxLength={20}
                textContentType='password'
                secureTextEntry={true}
                mode="outlined"
                onChangeText={x => {
                  setpass(x);
                }}
              />
              <TextInput
                label="Confirm password"
                maxLength={20}
                textContentType='password'
                secureTextEntry={true}
                mode="outlined"
                onChangeText={x => {
                  setconpass(x);
                }}
              />
            </Card.Content>
            <Card.Actions>
              <Button
                style={{minWidth: '40%', marginTop: 10}}
                mode="outlined"
                onPress={() => {match_pass()}}
                >
                <Text style={{fontSize: mlText}}>Updated password</Text>
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
      )

  }
  else{
      setLoad(true);
  }

};

export default withTheme(ResetPass);
