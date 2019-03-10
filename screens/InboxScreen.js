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

export default class InboxScreen extends React.Component {
  static navigationOptions = {
    title: 'Inbox',
  };

  render() {
    return (
      <View style={{flex:1, paddingLeft:10, paddingTop:10, paddingBottom:10, paddingRight:10, borderRadius:0, backgroundColor:'#fcfcfc'}}>
        <Text style={{color:'gray', marginTop:5, textAlign:'center', textAlignVertical:'top', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
          This your inbox. Any messages from other user or Admin will be shown here. you can also replied to the message.
        </Text>
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