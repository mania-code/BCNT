import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackTitalBar} from '../my components/TitalBar';
import {
  smText,
  xsmallText,
  midText,
  largeText,
  mlText,
  xlargeText,
  smallText,
} from '../Components/Responsive';

const LevelTeam = ({navigation}) => {
  const [loading, setLoaded] = useState(true);
  const [datalist, setDataList] = useState([]);
  const [userid, setuid] = useState('');
  const [teamSize, setTeamSize] = useState(0);
  const [lab, setlab] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      var c = JSON.parse(jsonValue);
      if (c !== null) {
        setuid(c.user_id);
      } else {
        console.log('clear local storage and close application');
        setLoaded(false);
      }

      setLoaded(false);
    } catch (e) {
      console.log(e);
      setLoaded(false);
    }
  };

  const getItems = async x => {
    setLoaded(true);
    if (x != 0) {
      await axios
        .get(
          'https://gheeson.in/bcnt/php_scripts/V7/levelTeamV7.php?userId=' +
            userid +
            '&level=' +
            x,
        )
        .then(function (response) {
          var {data} = response;
          console.log(data);
          setTeamSize(data[0]);
          setDataList(data[1]);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoaded(false);
        });
    } else {
      setLoaded(false);
      setDataList([]);
    }
  };

  const ListCompoent = () => {
    if (datalist.length == 0) {
      return (
        <Text style={{margin: 20, fontSize: xlargeText}}>Nothing to show!</Text>
      );
    } else {
      return (
        //   <View style={{flex:1}}>
        <>
          <ScrollView contentContainerStyle={{paddingBottom: 200}}>
            {/* <View style={{flex:1}}> */}
            {datalist.map((x, i) => {
              let id = x[0];
              let numa = x[2];
              let display;
              let displayNum = numa.replace(numa.substring(3,7),'****');
              if (id.length > 3) {
                display = id.replace(id.substring(2, 6), '****');
              } else {
                display = id;
              }
              return (
                <View style={styles.listcomponent} key={i}>
                  <Text style={styles.moneyText}>{x[1]}</Text>
                  <View style={styles.listcomponentUp}>
                    <Text style={styles.tagText}>ID - {display}</Text>
                    <Text style={styles.tagText}>Phone - {displayNum}</Text>
                  </View>
                  <View style={styles.listcomponentDown}>
                    <Text>DATE - {x[3]}</Text>
                  </View>
                </View>
              );
            })}
            {/* </View> */}
          </ScrollView>
        </>
      );
    }
  };

  return (
    <View>
      <BackTitalBar name="Level Team" nav={navigation} />
      <View style={{height: '100%'}}>
        <View style={styles.pickerview}>
          <Picker
            style={styles.inputD}
            itemStyle={{backgroundColor: '#fff'}}
            selectedValue={lab}
            onValueChange={x => {
              setlab(x);
              getItems(x);
            }}>
            <Picker.Item color="#008cfd" label="Select Level" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
          </Picker>
        </View>

        <Card style={{marginVertical: 10}}>
          <Card.Title title={'Team Size  - ' + teamSize} />
        </Card>

        {loading ? (
          <ActivityIndicator
            animating={true}
            color="#008DCF"
            size="large"
            style={styles.loader}
          />
        ) : (
          <ListCompoent />
        )}
      </View>
    </View>
  );
};

export default LevelTeam;

const styles = StyleSheet.create({
  pickerview: {
    width: '90%',
    backgroundColor: '#fad390',
    marginTop: 10,
    // marginBottom: 20,
    justifyContent: 'center',
    // height: 50,
    alignSelf: 'center',
    borderRadius: 25,
  },
  inputD: {
    width: '100%',
    margin: 0,
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
  loader: {
    marginTop: 250,
  },
});
