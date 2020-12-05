import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome'

import Items from '../../pages/items';
import Donate from '../../pages/donate';
import Search from '../../pages/search';
import Profile from '../../pages/profile';

import style from './style'

const TabNavigator = createBottomTabNavigator(

    {
        Itens: Items,
        'Seus Itens': Donate,
        Buscar: Search,
        Perfil: Profile
    },
    {
        tabBarOptions: {
            activeTintColor: '#00B3ED',
            inactiveTintColor: '#bdc3c7',
            style: {
                backgroundColor: '#ecf0f1'
            },
            showLabel: true,
        },
        defaultNavigationOptions: ({navigation}) => ({
          tabBarIcon: ({ focused, horizontal, tintColor })  => {
            const {routeName} = navigation.state;
            let IconComponent = Icon;
            let iconName;

            if(routeName === "Itens")
              iconName = 'home';
            if(routeName === "Seus Itens")
              iconName = 'folder-open';
            if(routeName === "Buscar")
              iconName = 'search';
            if(routeName === "Perfil")
              iconName = 'user';

            return <IconComponent name={iconName} size={24} color={tintColor}/>
          }
        })
    }
)

export default createAppContainer(TabNavigator);