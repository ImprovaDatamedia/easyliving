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
  Dimensions,
} from 'react-native';


export default class ComingSoonScreen extends React.Component {
  static navigationOptions = {
    title: 'Coming Soon',
  };
  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
        <View style={{flex:1, alignItems: 'center', backgroundColor: 'white'}}>
        <Image style={{flex:0.3,paddingLeft:20, paddingTop: 20, paddingRight:20, paddingBottom:20, resizeMode: 'contain'}}
            source={require('../assets/images/coming-soon-sign1.png')}/>
          </View>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft:0,    
  },
});  