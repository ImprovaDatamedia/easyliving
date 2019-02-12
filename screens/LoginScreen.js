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
  AsyncStorage,
} from 'react-native';
import Colors from '../constants/Colors';
import { createStackNavigator, createSwitchNavigator, NavigationActions, StackActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import SigningUpscreen from '../screens/SignUpScreen';

export default class WelcomeScreen extends React.Component {
static navigationOptions = {
    header : null
  };

    signUp = ()=> {
        this.props.navigation.navigate('SignUp')
      }
    resetStack = ()=> {
      AsyncStorage.setItem('userToken','abc' );
      this.props.navigation.navigate('App');
      }


    render() {
    // let lebar = 1.0*Dimensions.get('window').width;
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{height:300, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{top : 20, width:250*508/634, height: 250, resizeMode: 'contain'}} source={require('../assets/images/WelcomeEasyLiving.png')}/>
            </View>
            <TextField
                    label = 'Username'
           />
           <TextField
                    label = 'Password'
           />
           <TouchableOpacity onPress={this.resetStack} style={{backgroundColor : '#00BCD4', padding: 10, borderRadius : 10, textAlign : 'center'}}>
               <Text style={{color : '#fff', textAlign: 'center'}}>Login</Text>
           </TouchableOpacity>
                <Text style={{textAlign: 'center'}}> or </Text>
           <TouchableOpacity onPress={this.signUp} style={{backgroundColor : '#00BCD4', top : 10, padding: 10, borderRadius : 10, textAlign : 'center'}}>
               <Text style={{color : '#fff', textAlign: 'center'}}>Sign Up</Text>
           </TouchableOpacity>
        </View>
    );
  }
}

// const goHome = createSwitchNavigator({
//     First : {screen:WelcomeScreen},
//     SigningUp : createStackNavigator({
//         signUp : SigningUpscreen,
//     })
// })

// export default goHome;

const styles = StyleSheet.create({
  flexCenter: {
      flex : 1,
      flexDirection : 'column',
      justifyContent: 'space-between',
  },
container: {
   flex: 1,
    width: 200,
    height: 300,
    backgroundColor: '#33f',
    alignItems: 'stretch',
   alignItems: 'center',
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
