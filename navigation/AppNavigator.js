import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from '../navigation/LoginNavigator';
import SingUpScreen from '../navigation/SignUpNavigator';

export default createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    First: Login,
    Home : MainTabNavigator,
  
  });