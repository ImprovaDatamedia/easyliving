import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class ContactUsScreen extends React.Component {
  static navigationOptions = {
    title: 'Contact Us',
  };

  render() {
    return (
      <View style={{flex:1, paddingLeft:10, paddingTop:10, paddingBottom:10, paddingRight:10, borderRadius:0, backgroundColor:'#fcfcfc'}}>
        <Text style={{color:'gray', marginTop:5, textAlign:'center', textAlignVertical:'top', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
          This page will contain information about how to reach us, and how to get help from us
        </Text>
      </View>

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
