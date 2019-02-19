import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import Login from '../screens/LoginScreen';
import Main from '../navigation/MainTabNavigator'
import SignUpScreen from '../screens/SignUpScreen';


const LoginStack = createStackNavigator({
  // Welcome : WelcomeScreen,
  Login : Login,
  MainScreen : {
    screen : Main,
    navigationOptions : () =>({
      header : null
    })
  },
  SignUp : SignUpScreen,
});
//  const MainScreen = create
export default LoginStack ;
