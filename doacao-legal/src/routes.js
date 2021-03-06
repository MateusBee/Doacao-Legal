import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/login';
import NewUser from './pages/newUser';
import NewItem from './pages/newItem';
import Detail from './pages/detail';
import Recover from './pages/recover';
import Profile from './pages/profile';
import BottomNavigator from './components/tabNavigator/render';

function Routes(){
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="NewUser" component={NewUser}/>
                <AppStack.Screen name="NewItem" component={NewItem}/>
                <AppStack.Screen name="Detail" component={Detail}/>
                <AppStack.Screen name="Recover" component={Recover}/>
                <AppStack.Screen name="Profile" component={Profile}/>
                <AppStack.Screen name="BottomNavigator" component={BottomNavigator}/>
            </AppStack.Navigator>

        </NavigationContainer>
    );
}

export default Routes;

