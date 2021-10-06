import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screens/Home';
import {Profile,Mall} from '../my components/TestingComponents'
import Sidebar from '../my components/Sidebar';
// import Verify from './Verify';

const Drawer = createDrawerNavigator();

export default function Drower({navigation}) {
    return (
        <Drawer.Navigator 
        initialRouteName='Home'
        // initialRouteName='Verify'
        drawerContent={(props) => <Sidebar {...props} />}
        >
            {/* <Drawer.Screen name="Verify" component={Verify} /> */}
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Mall" component={Mall} />
            <Drawer.Screen name="Profile" component={Profile} /> 
        </Drawer.Navigator>
    )
}
