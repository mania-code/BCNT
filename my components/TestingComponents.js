import React from 'react'
import {Text , View , Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import {BackTitalBar,DrowerTitalBar} from './TitalBar';


const Index = ({ navigation }) =>
{
return(
  <View style={{flex:1, backgroundColor:'#ccc', justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30}}>This is Index Page</Text>
    <Button title='Go to home' onPress={()=>{navigation.navigate('Drower')}}></Button>
  </View>
)
}

// const Home = () =>
// {
// return(
//   <View>
//   <DrowerTitalBar/>
//   <LinearGradient colors={['#f12711','#f5af19']} style={{with:'100%', height:500 , backgroundColor:'#000',borderWidth:2 }}>
   
//     <Icon name='home' size={30} color='#fff' />
//     <Text style={{fontSize:30}}>This is Home Page</Text>
//   </LinearGradient>
//   </View>
// )
// }

const Profile = () =>
{
return(
  <View style={{flex:1, backgroundColor:'#123', justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30}}>This is Profile Page</Text>
  </View>
)
}

const Mall = () =>
{
return(
  <View style={{flex:1, backgroundColor:'#456', justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30}}>This is Mall Page</Text>
  </View>
)
}

export  {Index,Mall,Profile};
