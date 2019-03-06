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
  Button
} from 'react-native';
import Colors from '../constants/Colors';
import { createStackNavigator, createSwitchNavigator, NavigationActions, StackActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import SigningUpscreen from '../screens/SignUpScreen';

export default class WelcomeScreen extends React.Component {
// static navigationOptions = {
//     header : null
//   };
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this);
    this.state = {
      uname : '',
      pass : '',
      screenName : '',
    }
  }

  handler() {
      this.setState({
        screenName : this.props.navigation.state.params.screenName
      })
    }

    signUp = ()=> {
        this.props.navigation.navigate('SignUp')
      }
    resetStack = ()=> {
      AsyncStorage.setItem('userToken','abc' );
      const { navigation } = this.props;
      if (navigation.getParam('screenName')=='profile') {
          this.props.navigation.navigate('Account');
      }else if (navigation.getParam('screenName')=='easyRent') {
          this.props.navigation.navigate('EasyRentPasang');
      }
      }
    onPress = () => {
      fetch('http://192.168.1.104:8080/api/app/index.php/datalogin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username : this.state.uname,
        password : this.state.pass,
      })
        }).then((response) => response.json())
          .then((responseJson) => {

              for (let i = 0; i < responseJson.length; i++) {
                const dataUser = {
                        "nama" : responseJson[i]['nama'],
                        "userId" : responseJson[i]['userId'],
                        "phone" : responseJson[i]['phone'],
                        "alamat" : responseJson[i]['alamat'],
                        "username" : responseJson[i]['username'],
                        "photo" : responseJson[i]['photo'],
                }
                AsyncStorage.setItem('userData',JSON.stringify(dataUser) );
                AsyncStorage.setItem('userToken', responseJson[i]['__ci_last_regenerate'].toString());
                if (this.state.screenName=='profile') {
                    this.props.navigation.navigate('Account');
                }else if (this.state.screenName=='easyRent') {
                    this.props.navigation.navigate('EasyRentPasang');
                }else if (this.state.screenName=='') {
                    this.props.navigation.navigate('Account');
                }
                // Alert.alert(responseJson[i]['__ci_last_regenerate'].toString())
        }


            }).catch((error) => {
              console.error(error);
            });
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
                    onChangeText={ TextInputValue => this.setState({ uname : TextInputValue}) }
           />

           <TextField
                    label = 'Password'
                    onChangeText={ TextInputValue => this.setState({ pass : TextInputValue}) }
           />
           <TouchableOpacity onPress={this.onPress} style={{backgroundColor : '#00BCD4', padding: 10, borderRadius : 10, textAlign : 'center'}}>
               <Text style={{color : '#fff', textAlign: 'center'}}>Login</Text>
           </TouchableOpacity>
                <Text style={{textAlign: 'center'}}> or </Text>
          <TouchableOpacity onPress={this.resetStack} style={{backgroundColor : '#00BCD4', padding: 10, borderRadius : 10, textAlign : 'center'}}>
                <Text style={{color : '#fff', textAlign: 'center'}}>Continue without Login</Text>
          </TouchableOpacity>
          <View style={styles.signupcontainer}>
          <Text>Sign Up</Text>
          </View>
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
  signupcontainer: {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center',
      padding : 20,
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