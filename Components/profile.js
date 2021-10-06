import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, Card, IconButton, Badge} from 'react-native-paper';
import {
  smText,
  xsmallText,
  midText,
  largeText,
  mlText,
  xlargeText,
  smallText,
} from '../Components/Responsive';

export default function Profile(props) {
  return (
    <View style={styles.mainView}>
      {/* <Badge size={30} >2</Badge> */}
      <Avatar.Image
        size={xlargeText * 3}
        source={require('../Assets/male1_avatar.png')}/>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 5,
          paddingVertical: 5,
          minWidth: '40%',
          width: '50%',
          maxWidth: '80%',
          marginVertical: 5,
          flexDirection:'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderRadius:10,
        }}>

        <Avatar.Icon icon="certificate" size={xlargeText} />
        <Text style={{fontWeight: 'bold', color:'#008DCF',fontSize:midText}}>{props.badge}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <View style={styles.textBox}>
          <Text>User ID - {props.id}</Text>
          <Text>Name - {props.name} </Text>
        </View>
        <View style={styles.textBox}>
          <Text>Mobile - {props.mobile} </Text>
          <Text>Email - {props.email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    // backgroundColor:"tomato",
    width: '100%',
    // height:300,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  textBox: {
    // marginVertical: 5,
    marginLeft: 5,
    flex: 1,
    textAlign: 'center',
  },
});
