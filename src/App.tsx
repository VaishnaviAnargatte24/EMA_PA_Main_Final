import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import {POST_LOGIN_ROUTES, PRE_LOGIN_ROUTES} from './Routes';
import UserContextProvider from './shared/ContextProviders/UserContextProvider';
import BottomTabNavigator from './navigation/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const SafeAreaWrapper = (Component: any, backgroundColor: string) => () => {
  if (!Component) {
    console.error('SafeAreaWrapper received an undefined component.');
    return null;
  }

  return (
    <SafeAreaView style={{backgroundColor, flex: 1}}>
      <View style={{flex: 1}}>
        <Component />
      </View>
    </SafeAreaView>
  );
};

const Navigator = () => {
  const Routes = true ? POST_LOGIN_ROUTES : PRE_LOGIN_ROUTES;

  Routes.forEach((screen, index) => {
    if (!screen.component) {
      console.error(
        `Route at index ${index} (${screen.name}) has an undefined component.`,
      );
    }
  });

  return (
    <Stack.Navigator>
      {Routes.map(screen => {
        if (!screen.component) return null;

        return (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={SafeAreaWrapper(
              screen.component,
              screen.backgroundColor,
            )}
            options={{
              headerShown: false,
              navigationBar: {visible: false},
              navigationBarColor: '#ffffff',
              ...screen.options,
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const AppWithUserContext = () => (
  <UserContextProvider>
    <App />
  </UserContextProvider>
);

export default AppWithUserContext;
