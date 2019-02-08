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
import { TextField } from 'react-native-material-textfield';

class WelcomeScreen extends React.Component {

    page = ()=> {
        this.props.navigation.navigate('blank')
      }
  
    render() {
    // let lebar = 1.0*Dimensions.get('window').width;  
    return (
        <View style={{ justifyContent: 'center', backgroundColor: 'white'}}>
            <Image style={{top : 50, padding : 90, resizeMode: 'contain'}} source={require('../assets/images/HomeScreen/HomeTitle.png')}/>
           <TextField
                    label = 'Username'    
           />
           <TextField
                    label = 'Email'    
           />
           <TextField
                    label = 'Password'
           />
           <TouchableOpacity onPress={this.page} style={{backgroundColor : '#00BCD4', padding: 10, borderRadius : 10, textAlign : 'center'}}>
               <Text style={{color : '#fff', textAlign: 'center'}}>Sign Up</Text>
           </TouchableOpacity>
                <Text style={{textAlign: 'center'}}> or </Text>
        </View>
    );
  }
}

const goHome = createSwitchNavigator({
    First : {screen:WelcomeScreen},
    // LoginScreen : Login,
})

export default goHome;

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