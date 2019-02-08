import React from 'react';
import { Text, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createStackNavigator, createSwitchNavigator, NavigationActions, StackActions } from 'react-navigation';
// import LogOut from '../screens/LoginScreen';
// import Login from '../navigation/LoginNavigator';


 export default class ContactUsScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };

  resetStack = ()=> {
    return this.props
               .navigation
               .dispatch(StackActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'LoginStack'})
                    ]
                  }));
  }



  LogOut = () => {
//    this.props.navigation.navigate('LogOut')
    // Alert.alert('Bisa')
  }
  render() {
    return (
      <ScrollView style={styles.container}>
           <TouchableOpacity onPress={this.resetStack} style={{backgroundColor : '#00BCD4', padding: 10, borderRadius : 10, textAlign : 'center'}}>
             <Text style={{textAlign: 'center', padding : 10,}}>Log Out</Text>
           </TouchableOpacity>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
