import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  smText,
  xsmallText,
  midText,
  largeText,
  mlText,
  xlargeText,
  smallText,
} from '../Components/Responsive';
import {BackTitalBar} from '../my components/TitalBar';
import {Card} from 'react-native-paper';

const Income = ({navigation}) => {
  // const [user_Id, setUser_id] = useState()
  const [spinning, setspin] = useState(true);
  const [datalist, setDataList] = useState([]);
  const [sum, setsum] = useState(0)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      var c = JSON.parse(jsonValue);
      if (c !== null) {
        var user_id = c.user_id;
        fetchIt(user_id);
      } else {
        console.log('clear local storage and close application'); //todo - logout & close appication
      }
    } catch (e) {
      console.log(e);
      setspin(false);
    }
  };

  const fetchIt = x => {
    axios
      .get('https://bcnt.gheeserver.xyz/php_scripts/version6/incomeV6.php?userId=' + x)
      .then(function (response) {
        const {data} = response;
        setDataList(data[1]);
        // let tempSum = 0;
        // data.forEach(x => {
        //     tempSum = parseInt(tempSum) + parseInt(x.credit)
        // });
        setsum(data[0]);
      })
      .catch(function (error) {
        Alert.alert('Network Issue ' + error);
        //todo - close application
      })
      .finally(() => {
        setspin(false);
      });
  };

  const ListCompoent = () => {
    if (datalist.length == 0) {
      return <Text style={{margin: 20, fontSize:xlargeText}}>Nothing to show!</Text>;
    } else {
      return (
        <View style={{marginTop: 20}}>
          {datalist.map((x, i) => {
            let amtb = x.credit - x.debit;
            let amte = amtb * 0.15;
            let amt = amtb + amte;
            // setsum(sum + amt)
            let sign = Math.sign(amt);
            let color = '#6DAED4';
            if (sign < 0) {
              color = 'tomato';
            }

            // color = for reward
            let lable = x.lable
            if(lable == 'Reward Income')
            {
              color = 'tomato';
            }

            return (
              <View
                style={[styles.listcomponent, {backgroundColor: color}]}
                key={i}>
                <View style={styles.listcomponentUp}>
                  <Text style={styles.moneyText}>{amt}</Text>
                  <Text style={styles.tagText}>{x.description}</Text>
                </View>
                <View style={styles.listcomponentDown}>
                  <Text>DATE - {x.date}</Text>
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#eee'}}>
      <BackTitalBar name="Income" nav={navigation} />

      <Card style={{marginVertical: 10}}>
        <Card.Title title={'Total Income  -  ' + sum} />
      </Card>

      <ScrollView contentContainerStyle={{paddingBottom:20}} >
        {spinning ? (
          <ActivityIndicator
            animating={true}
            color="#008DCF"
            size="large"
            style={styles.loader}
          />
        ) : (
          <ListCompoent />
        )}
      </ScrollView>
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    fontSize: 35,
    margin: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  clogo: {
    width: 55,
    height: 55,
  },
  clogoOuter: {
    width: 40,
    height: 40,
    backgroundColor: '#dfe6e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    overflow: 'hidden',
  },
  listcomponent: {
    width: '95%',
    height: 70,
    // padding:2,
    marginBottom: 5,
    marginTop: 5,
    overflow: 'hidden',
    elevation: 2,
    // borderWidth:2,
    // borderColor:'#000',
    borderRadius: 15,
    alignSelf: 'center',
  },
  listcomponentUp: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listcomponentDown: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  moneyText: {
    fontSize: 25,
    // fontWeight:'bold',
    width: '20%',
    // backgroundColor:'tomato',
    textAlign: 'center',
  },
  tagText: {
    width: '75%',
    textAlign: 'center',
    fontSize: 22,
  },
  loader: {
    marginTop: 250,
  },
});
