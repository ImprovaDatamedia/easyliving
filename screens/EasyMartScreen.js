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

export default class EasyMartScreen extends React.Component {
  static navigationOptions = {
    title: 'Easy Mart',
  };
  render() {
    return (
        <View  style={{flex:1}}>
          <WebView
            source={{uri: 'http://www.skawan.id'}}
            style={{flex: 1}} // OR style={{height: 100, width: 100}}
          />
        </View>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});  