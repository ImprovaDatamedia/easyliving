import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import { createStackNavigator, createSwitchNavigator, NavigationActions } from 'react-navigation';
import Home from '../navigation/MainTabNavigator';

export default class WelcomeScreen extends React.Component {
    constructor(props){
        super(props)
//        setTimeout(()=>{
//            this.props.navigation.navigate('HomeScreen')
//        },2000)
    }

    goToHome = ()=> {
      this.props.navigation.navigate('HomeScreen')
    }
    showSignUpScreen = ()=> {
        this.props.navigation.navigate('SignUpScreen')
      }
  
    render() {
    let lebar = 1.0*Dimensions.get('window').width;  
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            <TouchableOpacity onPress={this.showSignUpScreen}>
            <Image source={require('../assets/images/WelcomeEasyLiving.png')} style={{flex:1, width:lebar, height:undefined, resizeMode: 'contain'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goToHome}>
                <Image
                source={require('../assets/images/SentulCityLogoSmall.png')}
                />
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  flexCenter: {
      flex : 1,
      flexDirection : 'column',
      justifyContent: 'space-between',
  },  
container: {
//    flex: 1,
    width: 200,
    height: 300,
    backgroundColor: '#33f',
    alignItems: 'stretch',
//    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeImage: {
//    flex: 1,
    width: '50%',
//    height: 400,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#3ff',
    justifyContent: 'center',
  },
});  