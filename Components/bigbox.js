import React from 'react'
import { View, Text, StyleSheet,Dimensions } from 'react-native'
import {smText,xsmallText,midText,largeText,mlText,xlargeText,smallText} from '../Components/Responsive';

const vh = Dimensions.get('window').height/100;

export default function Bigbox(props) {
    return (
        <View style={styles.mainView}>
            <View style={styles.currencylayoutBox}>
                <Text style={styles.currencytextBox}>Current BCNT coin price - {props.currentPrice} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={[styles.walletBox,]}>
              <Text style={[styles.walletBoxText,]}>Available Coins</Text> 
              <Text style={[styles.walletBoxText,]}>{props.avlCoin}</Text>
            </View>
            <View style={[styles.walletBox,]}>
              <Text style={[styles.walletBoxText,]}>Coin Withdrew</Text>
              <Text style={[styles.walletBoxText,]}>{props.withdrawed}</Text>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width:'100%',
        height:'auto',
        alignSelf:'center',
        marginVertical:10,
        paddingTop:10,
        paddingBottom:10,
    },
    currencytextBox:{
        fontSize:midText,
        alignSelf:'center',
        fontWeight:'bold',
        color:'#008DCF'
    },
    currencylayoutBox:
    {
      width: '96%',
      height:'auto',
      paddingVertical:10,
      alignSelf: 'center',
      borderColor: '#fff',
      borderWidth:2,
      borderRadius: 20,
      backgroundColor: '#fff',
    },
    walletBox:
    {
      width: '44%',
      height: 10*vh,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#fff',
      marginVertical:10,
    },
    walletBoxText:
    {
      fontSize: midText,
      fontWeight: '700',
      color: '#fff',
      padding: 2,
    },
    walletBoxText2:
    {
      flex: 1,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },

})