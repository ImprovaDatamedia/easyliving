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
  WebView,
} from 'react-native';

export default class EasyWebBrowserScreen extends React.Component {
  static navigationOptions = {
    title: 'eLiving',
  };

  render() {
    console.log(this.props.navigation.getParam('url', ''));
    return (
      <View  style={{flex:1}}>
      <WebView
        source={{uri: this.props.navigation.getParam('url', '')}}
        style={{flex: 1}} // OR style={{height: 100, width: 100}}
      />
    </View>   
    );
  }
}
