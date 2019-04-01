import React, { Component } from 'react';
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
//import { Widget } from 'react-chat-widget';
//import 'react-chat-widget/lib/styles.css';

export default class InboxScreen extends React.Component {
  static navigationOptions = {
    title: 'Inbox',
  };

  componentDidMount() {
//    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage(response);
  }

  render() {
    return (
      <ScrollView style={{flex:1, paddingLeft:20}}>
      <View style={{flex:1, paddingLeft:10, paddingTop:10, paddingBottom:10, paddingRight:10, borderRadius:0, backgroundColor:'#fcfcfc'}}>
        <Text style={{color:'gray', marginTop:5, textAlign:'center', textAlignVertical:'top', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
          This your inbox. Any messages from other user or Admin will be shown here. you can also replied to the message.
        </Text>
      </View>
      <View style={styles.talkBubble}>
        <View style={styles.talkBubbleSquare} >
        <Text> jhdjshdjs jds jhjd jshdjhd jsdj shdj shdjh jdshdj mnnmm mnmnm mnm mnmnm hj shjhd jsh js djs djsh dj</Text>
        </View>
        <View style={styles.talkBubbleTriangle} />
      </View> 
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  talkBubble: {
    backgroundColor: 'transparent'
  },
  talkBubbleSquare: {
    padding:10,
    width: 220,
    height: 100,
    backgroundColor: '#f4f4f4',
    borderRadius: 5
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: -16,
    top: 36,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderRightWidth: 26,
    borderRightColor: '#f4f4f4',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent'
  },
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