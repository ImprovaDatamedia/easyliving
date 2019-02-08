import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import OtherNav from './OtherNavigation';
import Login from '../screens/LoginScreen';
import SingUpScreen from '../screens/SignUpScreen';
import BlankScreen from '../screens/BlankScreen';

export default createStackNavigator({
      other : OtherNav
  });