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
import Main from '../navigation/MainTabNavigator';
import SigningUpscreen from '../screens/SignUpScreen';

export default class WelcomeScreen extends React.Component {
// static navigationOptions = {
//     header : null
//   };
  constructor(props){
    super(props)
    if(this.getUserToken!=''){this.props.navigation.goBack()}
    this.state = {
      uname : '',
      pass : '',
      screenName : '',
      refresh : 0
    }


    getUserToken=async()=>{
      const userToken = await AsyncStorage.getItem('userToken');
      return userToken;
    }

    // Alert.alert(this.state.screenName)
    // setInterval(()=>{
    //     this.setState({
    //         refresh : this.state.refresh + 1
    //     });
    // },2000)
  }
 //  componentDidMount(){
 //    this.subs =
 //    // [
 //       this.props.navigation.addListener('didBlur', this._bootstrapAsync);
 //       // this.props.navigation.addListener('willBlur', () => console.log('will blur')),
 //       // this.props.navigation.addListener('didFocus', () => console.log('did focus')),
 //       // this.props.navigation.addListener('didBlur', () => console.log('did blur')),
 // // ];
 //  }

  // componentWillUpdate(){
  //   this._bootstrapAsync();
  // }
  // _bootstrapAsync = async () => {
  //   const userToken = await AsyncStorage.getItem('userToken');
  //   this.props.navigation.navigate(userToken ? 'Account' : '');
  // };
  // handler() {
  //     this.setState({
  //       screenName : this.props.navigation.state.params.screenName
  //     })
  //   }

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
      }else{this.props.navigation.navigate('Home')}
      }

    onPress = () => {
      fetch('http://www.easyliving.id:81/app/index.php/datalogin', {
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
                AsyncStorage.setItem('userData',JSON.stringify(dataUser));
                AsyncStorage.setItem('userToken', responseJson[i]['__ci_last_regenerate'].toString());
                if (this.props.navigation.state.params.screenName!== null) {
                  this.props.navigation.navigate(this.props.navigation.state.params.screenName)
                }else{
                    // this.props.navigation.navigate('Account')
                    Alert.alert(this.props.navigation.state.params.screenName)
                }
                // Alert.alert(responseJson[i]['__ci_last_regenerate'].toString())
        }


            }).catch((error) => {
              console.error(error);
            });
      }

      componentDidMount(){
        this._sub = this.props.navigation.addListener('didFocus',this._componentFocused);
      }
         
      componentWillUnmount() {
        this._sub.remove();
      }
          
      _componentFocused = () => {
        console.log('getfocused: ');
        if(this.getUserToken!=''){this.props.navigation.goBack()}
      }
    

      

    render() {
    // let lebar = 1.0*Dimensions.get('window').width
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

// createAppContainer(createSwitchNavigator(
//   {
//     MainScreen: Main,
//   }
// ));

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
