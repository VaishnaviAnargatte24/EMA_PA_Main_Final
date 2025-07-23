import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BOTTOM_ROUTES} from '../Routes';
import {scale} from 'react-native-size-matters';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Regular',
          fontWeight: '400',
          fontSize: scale(12),

          textAlign: 'center',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          marginBottom: 0, // prevent icon shifting
        },
        tabBarStyle: {
          height: scale(52), // or your desired height
        },
      }}>
      {BOTTOM_ROUTES.map((route, index) => {
        if (!route.component || !route.name) {
          console.warn('Invalid route at index', index, route);
          return null;
        }

        return (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? route.activeIcon : route.icon,

              tabBarLabel: ({focused}) => (
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontWeight: '500',
                    fontSize: scale(12),
                    color: focused ? '#2E4995' : '#000000',
                    textAlign: 'center',
                  }}>
                  {route.name}
                </Text>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
