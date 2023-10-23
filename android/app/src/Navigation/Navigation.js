import {View, Text} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './NavigationScreens/Splash';
import LoginScreen from './NavigationScreens/LoginScreen';
import HomeScreen from './NavigationScreens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import VerifyOTPScreen from './NavigationScreens/VerifyOTPScreen';
import HistoryScreen from './NavigationScreens/HistoryScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash}   options={{ headerShown: false }}/>
      <Stack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen}   options={{ headerShown: false }}/>
      <Stack.Screen name="HomeScreen" component={HomeScreen}   options={{ headerShown: false }}/>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen}  />

    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
