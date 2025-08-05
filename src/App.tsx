import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import {POST_LOGIN_ROUTES, PRE_LOGIN_ROUTES, BOTTOM_ROUTES} from './Routes';
import UserContextProvider from './shared/ContextProviders/UserContextProvider';
import BottomTabNavigator from './navigation/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const SafeAreaWrapper = (
  Component: React.ComponentType<any>,
  backgroundColor: string,
) => () => {
  if (!Component) {
    console.error('SafeAreaWrapper received an undefined component.');
    return null;
  }

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]}>
      <View style={styles.flex}>
        <Component />
      </View>
    </SafeAreaView>
  );
};

const Navigator = () => {
  const isLoggedIn = true; // Replace with real auth logic
  const Routes = [...(isLoggedIn ? POST_LOGIN_ROUTES : PRE_LOGIN_ROUTES), ...BOTTOM_ROUTES];

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {Routes.map(screen => {
        const Component = screen.name === 'Home' ? BottomTabNavigator : screen.component;

        return (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={SafeAreaWrapper(Component, screen.backgroundColor)}
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
    <GestureHandlerRootView style={styles.flex}>
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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
