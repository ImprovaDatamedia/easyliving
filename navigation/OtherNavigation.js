import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/LoginScreen';
import SingUpScreen from '../screens/SignUpScreen';
import BlankScreen from '../screens/BlankScreen';

export default createSwitchNavigator({
    Home : MainTabNavigator,
  });