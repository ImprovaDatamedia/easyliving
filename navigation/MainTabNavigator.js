import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import InboxScreen from '../screens/InboxScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import AccountScreen from '../screens/AccountScreen';
import SelectServiceScreen from '../screens/SelectServiceScreen';
import ShuttleBusZoomScreen from '../screens/ShuttleBusZoomScreen';
import EasyMartScreen from '../screens/EasyMartScreen';
import TestDBScreen from '../screens/TestDBScreen';
import BlankScreen from '../screens/BlankScreen';
import TestScreen from '../screens/TestScreen';
import RTRWScreen from '../screens/RTRWScreen';
import EasyGoScreen from '../screens/EasyGoScreen';
import ShuttleRouteScreen from '../screens/ShuttleRouteScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import EasyBuildScreen from '../screens/EasyBuildScreen';
import EasyServiceScreen from '../screens/EasyServiceScreen';
import EasyRentScreen from '../screens/EasyRentScreen';
import EasyRentKategoriScreen from '../screens/EasyRentKategoriScreen';
import EasyRentPasangScreen from '../screens/EasyRentPasangScreen';
import EasyRentPasangConfirmScreen from '../screens/EasyRentPasangConfirmScreen';
import EasyPhoneKategoriScreen from '../screens/EasyPhoneKategoriScreen';
import EasyPhoneNumberScreen from '../screens/EasyPhoneNumberScreen';
import EasyPhoneDetailScreen from '../screens/EasyPhoneDetailScreen';
import EasyRentDetailScreen from '../screens/EasyRentDetailScreen';
import EasyAdminLocScreen from '../screens/EasyAdminLocScreen';
import EasyPhoneAddScreen from '../screens/EasyPhoneAddScreen';
import EasyWebBrowserScreen from '../screens/EasyWebBrowserScreen';
import EasyMartBarangDetailScreen from '../screens/EasyMartBarangDetail';
import EasyMartKeranjangScreen from '../screens/EasyMartKeranjangScreen';
import FormLogin from '../screens/LoginScreen';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ShuttleBusZoom : ShuttleBusZoomScreen,  
  SelectService: SelectServiceScreen,
  EasyMart: EasyMartScreen,
  TestDB: TestDBScreen,
  Blank: BlankScreen,
  Test: TestScreen,
  RTRW: RTRWScreen,
  EasyGo: EasyGoScreen,
  ShuttleRoute: ShuttleRouteScreen,
  ComingSoon: ComingSoonScreen,
  EasyBuild: EasyBuildScreen,
  EasyService: EasyServiceScreen,
  EasyRent: EasyRentScreen,
  EasyRentKategori: EasyRentKategoriScreen,
  EasyRentPasang: EasyRentPasangScreen,
  EasyRentPasangConfirm : EasyRentPasangConfirmScreen,
  EasyPhoneKategori : EasyPhoneKategoriScreen,
  EasyPhoneNumber : EasyPhoneNumberScreen,
  EasyPhoneDetail : EasyPhoneDetailScreen,
  EasyRentDetail : EasyRentDetailScreen,
  EasyAdminLoc : EasyAdminLocScreen,
  EasyPhoneAdd : EasyPhoneAddScreen,
  EasyWebBrowser : EasyWebBrowserScreen,
  EasyMartBarangDetail : EasyMartBarangDetailScreen,
  EasyMartKeranjang : EasyMartKeranjangScreen,
});



HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  header:null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};


const InfoStack = createStackNavigator({
  Info: InfoScreen,
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-help-circle' : 'md-help'}
    />
  ),
};

const InboxStack = createStackNavigator({
  Inbox: InboxScreen,
});

InboxStack.navigationOptions = {
  tabBarLabel: 'Inbox',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'}
    />
  ),
};


const ContactUsStack = createStackNavigator({
  ContactUs: ContactUsScreen,
});

ContactUsStack.navigationOptions = {
  tabBarLabel: 'Contact Us',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-call' : 'md-call'}
    />
  ),
};


const AccountStack = createSwitchNavigator({
  Account: AccountScreen,
  loginForm: FormLogin
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  header : null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  InfoStack,
  InboxStack,
  ContactUsStack,
  AccountStack,
},{
  tabBarOptions: {
      showLabel: true,
      activeTintColor: 'black', // active icon color
      inactiveTintColor: 'darkgray',  // inactive icon color
      style: {
          backgroundColor: 'cornsilk'//'linen' // TabBar background
      }
  }});

