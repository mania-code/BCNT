import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper'
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

const DirectTeam = ({navigation}) => {
  // const [user_Id, setUser_id] = useState()
  const [spinning, setspin] = useState(true);
  const [datalist, setDataList] = useState([]);
  const [listLength, setlistLength] = useState(0)
  const [teamCount , setTeamCount] = useState(0)

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
      .get('https://gheeson.in/bcnt/php_scripts/V7/directTeamV7.php?userId=' + x)
      .then(function (response) {
        const {data} = response;
        setDataList(data[1]);
        setlistLength(data[1].length)
        // setTeamCount(data[0])
      })
      .catch(function (error) {
        Alert.alert('Network Issue ' + error.messaage)
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
             let id = x.userId;
             var display;
             if (id.length > 3) {
              display = id.replace(id.substring(2,6), '****')
             }else
             {
              display = id;
             }
            return (
              <View style={styles.listcomponent} key={i}>
                <Text style={styles.moneyText}>{x.name}</Text>
                <View style={styles.listcomponentUp}>
                  <Text style={styles.tagText}>ID - {display}</Text>
                  <Text style={styles.tagText}>Phone - {x.phone}</Text>
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
      <BackTitalBar name="Direct Team" nav={navigation} />
      <Card style={{marginVertical: 10}}>
        <Card.Title title={'Total Direct Team - ' + listLength } />
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

export default DirectTeam;

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
    fontSize: mlText,
    fontWeight: 'bold',
  },
  tagText: {
    width: '50%',
    textAlign: 'center',
    fontSize: smText,
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
