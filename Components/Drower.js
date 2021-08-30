import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screens/Home';
import {Profile,Mall} from '../my components/TestingComponents'
import Sidebar from '../my components/Sidebar';

const Drawer = createDrawerNavigator();

export default function Drower({navigation}) {
    return (
        <Drawer.Navigator 
        initialRouteName='Home'
        drawerContent={(props) => <Sidebar {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Mall" component={Mall} />
            <Drawer.Screen name="Profile" component={Profile} /> 
        </Drawer.Navigator>
    )
}
