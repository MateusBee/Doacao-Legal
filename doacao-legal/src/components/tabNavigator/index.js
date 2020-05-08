import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome'

import Items from '../../pages/items';
import Donate from '../../pages/donate';
import NewItem from '../../pages/newItem';
import Profile from '../../pages/profile';

import style from './style'

const TabNavigator = createBottomTabNavigator(

    {
        Itens: Items,
        'Seus Itens': Donate,
        Doar: NewItem,
        Perfil: Profile
    },
    {
        tabBarOptions: {
            activeTintColor: '#e91e63',
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
            if(routeName === "Doar")
              iconName = 'plus';
            if(routeName === "Perfil")
              iconName = 'user';

            return <IconComponent name={iconName} size={24} color={tintColor}/>
          }
        })
    }
)

export default createAppContainer(TabNavigator);