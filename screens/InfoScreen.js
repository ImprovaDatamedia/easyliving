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
} from 'react-native';

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };

  render() {
    return (
      <View style={{flex:1, paddingLeft:10, paddingTop:10, paddingBottom:10, paddingRight:10, borderRadius:0, backgroundColor:'#fcfcfc'}}>
        <Text style={{color:'gray', marginTop:5, textAlign:'center', textAlignVertical:'top', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
          This page will contain information about Easy Living and how to utilize it to make your live in Sentul City easier.
        </Text>
      </View>
);
  }
}
