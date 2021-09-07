import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  Linking,
  Button,
  Dimensions,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {withTheme, ActivityIndicator} from 'react-native-paper';
import countrylist from '../Assets/countryies.json';
import stateslist from '../Assets/state.json';
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";


const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const SignUp = ({navigation, theme}) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('linkSponsor');
        if (value !== null) {
          setreferal(value);

          axios
            .get(
              'https://bcnt.gheeserver.xyz/php_scripts/sponsor_name.php?id=' +
                value,
            )
            .then(response => {
              console.log(response.data);
              if (response.data == '' || response.data == 'Empty entry') {
                setspname('User Not Found');
              } else {
                setspname('Sponsor Name - ' + response.data);
              }
            })
            .catch(error => {
              Alert.alert('Server Error -', error.message);
            });
        }
      } catch (e) {
        console.log('no sponsor aval' + e);
      }
    };

    getData();

    return () => {};
  }, []);

  

  const [name, setname] = useState('');
  const [userId, setuserId] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [referal, setreferal] = useState('');
  const [countryCode, setCountryCode] = useState(null);
  const [stateCode, setStateCode] = useState(null);
  var [stalist, setstalist] = useState(stateslist);
  const [spname, setspname] = useState('');
  const [uidAval, setuidAval] = useState('');
  const [uidBorder, setuidBorder] = useState('#dfe6e9');

  const [loading, setLoad] = useState(false);

  const cc = '#f00';

  const {colors} = theme;
  // console.log(route.params.uid);

  const validate2 = email => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
    // let boola = expression.test(String(email).toLowerCase())
  };

  const validate = () => {
    if (
      userId.length == 0 ||
      referal.length == 0 ||
      userId.length > 10 ||
      password.length == 0 ||
      cpassword.length == 0 ||
      name.length == 0 ||
      mobile.length == 0 ||
      email.length == 0 ||
      mobile.length < 10 ||
      userId.indexOf(' ') >= 0 ||
      stateCode == null ||
      countryCode == null ||
      password != cpassword ||
      !validate2(email)
    ) {
      if (password != cpassword) {
        Snackbar.show({
          text: 'Password does not match',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      } else if (userId.length > 10) {
        Snackbar.show({
          text: 'UserId must be less then 10 letters',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      } else if (mobile.length < 10) {
        Snackbar.show({
          text: 'Please! Enter a Valid Mobile Number',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      } else if (!validate2(email)) {
        Snackbar.show({
          text: 'Please! Enter a Valid Email Address',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      } else if (referal.length == 0)
      {
        Snackbar.show({
          text: 'Please! Enter a Valid Referral ',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      } else if (userId.indexOf(' ') >= 0)
      {
        Snackbar.show({
          text: 'User Id should not contain Space',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      } 
      else {
        Snackbar.show({
          text: 'please fill details!!',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: colors.secondary,
          textColor: '#FFF',
        });
      }
    } else {
      const auth = async (unkid) => {
        try {
          setLoad(true);
          axios
            .get('https://bcnt.gheeserver.xyz/php_scripts/register.php/', {
              // data: { firstName: 'Fred',} # try to use passing object insterd of single single params
              params: {
                name: name,
                email: email,
                pwd: password,
                phone: mobile,
                sponsor: referal,
                userid: userId,
                country: countryCode,
                state: stateCode,
                city: '00',
                imei: unkid,
              },
            })
            .then(function (response) {
              let rstring = response.data;
              if (rstring.result == 'USER Registred Successfuly') {
                const userOjbect = {
                  user_id: userId,
                  user_name: name,
                  user_mobile: mobile,
                  user_email: email,
                };

                const storeData = async value => {
                  try {
                    const jsonValue = JSON.stringify(value);
                    await AsyncStorage.setItem('userData', jsonValue);
                  } catch (e) {
                    console.log(e);
                  }
                };

                storeData(userOjbect);

                navigation.replace('Drower');
                Snackbar.show({
                  text: 'Welcome ' + name,
                  backgroundColor: colors.primary,
                  duration: Snackbar.LENGTH_LONG,
                  textColor: '#fff',
                });
              } else {
                console.log('check -> ' + rstring.result);
                Alert.alert('Failure', rstring);
              }
            })
            .catch(function (error) {
              Alert.alert('Error - ', error.message);
            })
            .finally(() => {
              setLoad(false);
            });
        } catch (error) {
          Alert.alert('something went wrong - ', error.message);
          setLoad(false);
        }
      };

      let kaka = DeviceInfo.getUniqueId()
      
      deviceVal(kaka, userId, auth)
     
      
    }
  };

  const deviceVal = (unkid,user,auth) => {

    axios.get('https://bcnt.gheeserver.xyz/php_scripts/deviceValidation.php?user='+ user +'&imei='+ unkid)
    .then((resp)=>{

      if(resp.data == 'available')
      {
        auth(unkid)
      }else
      {
        Alert.alert('Device Error -', resp.data)
      }

    })
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={colors.primary}
          size="large"
          style={styles.loader}
        />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <StatusBar backgroundColor="#37517e" />
          <Image source={require('../Assets/LOGO.png')} style={styles.img} />
          <View style={styles.lbottom}>
            <View style={styles.inputView}>
              <Text style={styles.labelText}>
                {' '}
                <Icon name="link" size={18} color="#fff" /> Referral Id
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder=" Enter Referral Id"
                placeholderTextColor="#777"
                autoCapitalize="characters"
                onChangeText={x => {
                  setreferal(x);
                }}
                onEndEditing={x => {
                  axios
                    .get(
                      'https://bcnt.gheeserver.xyz/php_scripts/sponsor_name.php?id=' +
                        x.nativeEvent.text,
                    )
                    .then(response => {
                      console.log(response.data);
                      if (
                        response.data == '' ||
                        response.data == 'Empty entry'
                      ) {
                        setspname('User Not Found');
                      } else {
                        setspname('Sponsor Name - ' + response.data);
                      }
                    })
                    .catch(error => {
                      Alert.alert('Server Error -', error.message);
                    });
                }}
                value={referal}></TextInput>
              <Text
                style={{
                  color: '#fff',
                  marginRight: 5,
                  fontSize: 12,
                  marginLeft: 20,
                  marginVertical: 7,
                }}>
                {spname}
              </Text>
            </View>

            <View style={styles.inputView}>
              <Text style={styles.labelText}>
                {' '}
                <Icon name="user" size={18} color="#fff" /> Your Name
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder=" Enter Name"
                textContentType="name"
                placeholderTextColor="#777"
                onChangeText={x => {
                  setname(x);
                }}
                value={name}></TextInput>
            </View>

            <View style={styles.inputView}>
              <Text style={styles.labelText}>
                {' '}
                <Icon name="mobile" size={22} color="#fff" /> Mobile
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder=" Enter Mobile Number"
                placeholderTextColor="#777"
                maxLength={10}
                autoCompleteType="tel"
                onChangeText={x => {
                  setmobile(x);
                }}
                value={mobile}></TextInput>
            </View>

            <View style={styles.inputView}>
              <Text style={styles.labelText}>
                {' '}
                <Icon name="envelope" size={18} color="#fff" /> Your Email
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder=" Enter Email"
                maxLength={80}
                textContentType="emailAddress"
                placeholderTextColor="#777"
                onChangeText={x => {
                  setemail(x);
                }}
                // onEndEditing={x => {validate2(x.nativeEvent.text)}}
                value={email}></TextInput>
            </View>

            {/* picker country, state and city start */}

            <View style={styles.pickerview}>
              <Picker
                style={styles.inputD}
                selectedValue={countryCode}
                onValueChange={x => {
                  const tempScode = x;
                  setCountryCode(x);
                  (function () {
                    setstalist(
                      stalist.filter(
                        element => element.country_id == tempScode,
                      ),
                    );
                  })();
                }}>
                <Picker.Item label="Select Country" value={null} />
                {countrylist.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.id}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={styles.pickerview}>
              <Picker
                style={styles.inputD}
                selectedValue={stateCode}
                onValueChange={x => {
                  setStateCode(x);
                }}
                // onValueChange={(x) => {console.log(x)}}
              >
                <Picker.Item label="Select State" value={null} />
                {stalist.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.id}
                    />
                  );
                })}
              </Picker>
            </View>

            {/* picker country, state and city end */}

            <View style={styles.inputView}>
              <Text style={styles.labelText}>
                {' '}
                <Icon name="id-card" size={18} color="#fff" /> Set UserId - 10
                letters only*
              </Text>
              <TextInput
                style={[
                  styles.inputText,
                  {borderWidth: 2, borderColor: uidBorder},
                ]}
                placeholder=" Enter UserID 10 letters only*"
                placeholderTextColor="#777"
                maxLength={10}
                textContentType="organizationName"
                autoCapitalize="characters"
                onChangeText={x => {
                  setuserId(x);
                }}
                onEndEditing={x => {
                  axios
                    .get(
                      'https://bcnt.gheeserver.xyz/php_scripts/check_uid.php?uid=' +
                        x.nativeEvent.text,
                    )
                    .then(response => {
                      if (response.data == 'available') {
                        setuidBorder('#357a38');
                      } else {
                        setuidBorder('#aa2e25');
                      }
                      setuidAval('This user id is ' + response.data);
                    })
                    .catch(error => {
                      Alert.alert('Server Error -', error.message);
                    });
                }}
                value={userId}></TextInput>
              <Text
                style={{
                  color: '#fff',
                  marginRight: 5,
                  fontSize: 12,
                  marginLeft: 20,
                  marginVertical: 5,
                }}>
                {uidAval}
              </Text>
            </View>

            <View style={styles.inputView}>
              <Text style={styles.labelText}>
                {' '}
                <Icon name="unlock-alt" size={18} color="#fff" /> Password
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder=" Password"
                placeholderTextColor="#777"
                textContentType="password"
                secureTextEntry={true}
                onChangeText={x => {
                  setpassword(x);
                }}
                value={password}></TextInput>
            </View>

            <View style={styles.inputView}>
              <Text style={styles.labelText}>
                {' '}
                <Icon name="unlock-alt" size={18} color="#fff" /> Confirm
                Password
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder=" Password"
                placeholderTextColor="#777"
                secureTextEntry={true}
                textContentType="telephoneNumber"
                onChangeText={x => {
                  setcpassword(x);
                }}
                value={cpassword}></TextInput>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', marginRight: 5, fontSize: 12}}>
                *By registering you agree to our
              </Text>
              <Text
                onPress={() => {
                  Linking.openURL(
                    'https://bcnt.gheeserver.xyz/Assets/Terms.pdf',
                  );
                }}
                style={{color: 'tomato'}}>
                terms and conditions
              </Text>
            </View>

            <TouchableOpacity
              style={styles.SignupBtn}
              onPress={() => {
                Keyboard.dismiss();
                validate();
              }}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff'}}>
                Register
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('LogIn')}>
              <Text style={styles.forgot}>Alredy have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default withTheme(SignUp);

const styles = StyleSheet.create({
  inputView: {
    width: '80%',
    // backgroundColor: "red",
    // height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    // padding: 20
  },
  inputText: {
    height: 50,
    color: '#000',
    backgroundColor: '#dfe6e9',
    borderRadius: 25,
    paddingLeft: 15,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  SignupBtn: {
    width: vw * 80,
    backgroundColor: '#ffbc49',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  lbottom: {
    width: '100%',
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#37517e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  img: {
    width: 180,
    height: 180,
    marginBottom: 30,
    marginTop: 30,
  },
  pickerview: {
    width: '80%',
    backgroundColor: '#fad390',
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 25,
  },
  inputD: {
    width: '100%',
    margin: 0,
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    padding: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonebox: {
    display: 'none',
  },
  loader: {
    marginTop: 250,
  },
});
