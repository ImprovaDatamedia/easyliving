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
import {CryptoEncrypt, CryptoDecrypt, queryTable, quaryTableCrypto, queryTableCrypto, screenMask} from '../components/react-native-improva.js';
import { Button } from 'react-native-elements';


export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };

  constructor(props) {
    super(props);
    this.state={
      Data : [],
      textCrypto : 'Hallo Indonesia',
      textPlain :'',
    }
  }  

  executeCrypto(){
    queryTable('select * from easyliving.tbuser',(Data)=>this.setState({textCrypto:this.state.textCrypto+'Get Crypto'}),()=>alert('error'));
  }


  render() {
    return (
      <ScrollView style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{marginLeft:10, marginRight:10}}>
          <View style={{height:30}}/>
          <View style={{height:50, marginLeft:10, marginRight:10}}>
            <Button buttonStyle={{height:50, backgroundColor:'mediumseagreen'}}
                raised
                onPress={this.executeCrypto}
                title="Execute"
                borderRadius={5}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />                
          </View>
          <View style={{height:20}}/>
          <Text style={{color:'#707070', height:50, textAlign:'center', textAlignVertical:'center', fontSize:24, backgroundColor: 'transparent'}}>
            Result:
          </Text>
        </View>
        <View><Text>{this.state.textCrypto}</Text></View>
        {screenMask(this.state.showScreenMask)}
      </ScrollView>  

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