import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  midText,
  xlargeText,
} from '../Components/Responsive';
import {BackTitalBar} from '../my components/TitalBar';
import {Card} from 'react-native-paper';

const Payout = ({navigation}) => {

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
      .get(
        'https://bcnt.gheeserver.xyz/php_scripts/withdrawHistory.php?userId=' +
          x,
      )
      .then(function (response) {
        const {data} = response;
        setDataList(data);
        let tempSum = 0;
        data.forEach(x => {
            if (x.status == 'A') {
                tempSum = parseInt(tempSum) + parseInt(x.amount)   
            }
        });
        setsum(tempSum);
      })
      .catch(function (error) {
        // Alert.alert('Network Issue ' + error)
        //todo - close application
        console.log(error);
      })
      .finally(() => {
        setspin(false);
      });
  };

  const ListCompoent = () => {
    if (datalist.length == 0) {
      return (
        <Text style={{margin: 20, fontSize: xlargeText}}>Nothing to show!</Text>
      );
    } else {
      return (
        <View style={{marginTop: 20}}>
          {datalist.map((x, i) => {
             let amtb = x.amount;
             let amte = amtb * 0.15;
             let amt = amtb + amte;
            let stat;
            let colo;
            if (x.status == 'P') {
              stat = 'Pending';
              colo = '#008DCF';
            } else if (x.status == 'A') {
              stat = 'Completed';
              colo = '#4caf50';
            } else {
              stat = 'Blocked';
              colo = '#e66759';
            }
            return (
              <View
                style={[styles.listcomponent, {backgroundColor: colo}]}
                key={i}>
                <Text style={styles.moneyText}>{x.cryptoAddress}</Text>
                <View style={styles.listcomponentUp}>
                  <Text style={styles.tagText}>{amt}</Text>
                  <Text style={styles.tagText}>{stat}</Text>
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
      <BackTitalBar name="Payouts" nav={navigation} />

      <Card style={{marginVertical: 10}}>
        <Card.Title title={'Total Amount Withdrew  -  ' + sum} />
      </Card>

      <ScrollView>
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

export default Payout;

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
    marginBottom: 5,
    marginTop: 5,
    overflow: 'hidden',
    elevation: 2,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: '#6DAED4',
  },
  listcomponentUp: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listcomponentDown: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  moneyText: {
    width: '100%',
    textAlign: 'center',
    fontSize: midText,
    height: midText + 5,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  tagText: {
    width: '50%',
    textAlign: 'center',
    fontSize: midText,
  },
  // tagText2:
  // {
  //     width: '60%',
  //     textAlign: 'center',
  // },
  loader: {
    marginTop: 250,
  },
});
