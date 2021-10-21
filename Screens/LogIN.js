import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity, StatusBar, ScrollView, Dimensions,Keyboard} from 'react-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withTheme, ActivityIndicator } from 'react-native-paper';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const LogInScreen = ({ navigation, theme }) => {

    const [userId, setuserId] = useState('')
    const [password, setpassword] = useState('')

    const [loading, setLoad] = useState(false);

    const { colors } = theme;

    const validate = () => {
        if (password == '' || userId == '') {

            Snackbar.show({
                text: 'Please fill details!!',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.secondary,
                textColor: '#FFF'
            });
        }
        else {
            const auth = async () => {
                try {
                    setLoad(true);
                    axios.get('https://gheeson.in/bcnt/php_scripts/V11/newLogin.php?userId=' + userId + '&password=' + password)
                        .then(function (response) {
                            const rstring = response.data;
                            
                            if (rstring[0] == 'welcome') {
                                Snackbar.show({
                                    text: "Welcome",
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor: colors.primary,
                                    textColor: '#FFF'
                                })
                                const userOjbect = {
                                    user_id: userId,
                                    user_name: rstring[3],
                                    user_mobile: rstring[1],
                                    user_email: rstring[2],
                                    user_verified: true,
                                }

                                const storeData = async (value) => {
                                    try {
                                        const jsonValue = JSON.stringify(value)
                                        await AsyncStorage.setItem('userData', jsonValue)
                                        navigation.replace('Drower');
                                    } catch (e) {
                                        Alert.alert("Data not stored in LocalStorage!! please uninstall and again install thr App")
                                    }
                                }

                                storeData(userOjbect);
                                
                            }
                            else if (rstring[0] == 'Verify')
                            {
                                Snackbar.show({
                                    text: "Please Verify your Email",
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor: colors.primary,
                                    textColor: '#FFF'
                                })
                                const userOjbect = {
                                    user_id: userId,
                                    user_name: rstring[3],
                                    user_mobile: rstring[1],
                                    user_email: rstring[2],
                                    user_verified: false,
                                }

                                const storeData = async (value) => {
                                    try {
                                        const jsonValue = JSON.stringify(value)
                                        await AsyncStorage.setItem('userData', jsonValue)
                                        navigation.replace('Verify');
                                    } catch (e) {
                                        Alert.alert("Data not stored in LocalStorage!! please uninstall and again install thr App")
                                    }
                                }

                                storeData(userOjbect);
                            }
                            else {
                                console.log(response.data);
                                Snackbar.show({
                                    text: "Your UserId or Password is incorrect!!",
                                    duration: Snackbar.LENGTH_LONG,
                                    backgroundColor: colors.secondary,
                                    textColor: '#FFF'
                                })
                            }

                        })
                        .catch(function (error) {
                            console.log(error)
                            Snackbar.show({
                                text: "Server Down!!" + error,
                                duration: Snackbar.LENGTH_LONG,
                                backgroundColor: colors.secondary,
                                textColor: '#FFF'
                            })
                        })
                        .finally(() => setLoad(false));
                }
                catch (error) {
                    setLoad(false);
                    Snackbar.show({
                        text: 'Something went wrong! tyr again' + error,
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: colors.secondary,
                        textColor: '#FFF'
                    });
                }
            }

            auth();
        }
    }

    return (

        <ScrollView keyboardShouldPersistTaps='handled' >


            {
                loading ? <ActivityIndicator animating={true} color={colors.primary} size='large' style={styles.loader} />
                    : <View style={{ flex: 1, height: vh * 100, backgroundColor: '#fff', justifyContent: 'flex-end', alignItems: 'center' }} >
                        <StatusBar backgroundColor='#003078'></StatusBar>
                        <Image source={require('../Assets/LOGO.png')} style={styles.img} />
                        <View style={styles.lbottom}>
                            <View style={styles.inputView} >
                                <TextInput style={styles.inputText} placeholder=' User Id'
                                    placeholderTextColor="#777"
                                    autoCapitalize="characters"
                                    onChangeText={(x) => { setuserId(x) }}
                                    value={userId}
                                ></TextInput>
                            </View>
                            <View style={styles.inputView} >
                                <TextInput style={styles.inputText} placeholder=' Password'
                                    placeholderTextColor="#777"
                                    secureTextEntry={true}
                                    textContentType='password'
                                    onChangeText={(x) => { setpassword(x) }}
                                    value={password}
                                ></TextInput>
                            </View>

                            <TouchableOpacity style={styles.SignupBtn}
                                onPress={() => { 
                                    Keyboard.dismiss()
                                    validate() }}>
                                <Text style={styles.loginText}>LOG IN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginBtn}
                                onPress={() => navigation.replace('SignUp')}
                            >
                                <Text style={styles.loginText}>SIGN UP</Text>
                            </TouchableOpacity>
                            <Text style={styles.forgot}>Login if you are alredy Registred</Text>
                            <Text style={styles.forgot}>Click Sign Up to create a new account</Text> 
                        </View>
                    </View>
            }

        </ScrollView>
    )

}


export default withTheme(LogInScreen);

const styles = StyleSheet.create({
    inputView: {
        width: "80%",
        backgroundColor: "#dfe6e9",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "black"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        backgroundColor:'#84CC16',
        justifyContent: "center",
        marginBottom: 10

    },
    SignupBtn: {
        width: "80%",
        backgroundColor: "#ffbc49",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 20
    },
    lbottom:
    {
        width: '100%',
        minHeight: 400,
        height: '65%',
        backgroundColor: '#37517e',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    img: {
        width: 180,
        height: 180,
        marginBottom: 30,
    },
    loader: {
        marginTop: 250
    }
})