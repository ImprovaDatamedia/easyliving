import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Picker,
  TextInput,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import EasyRentKategoriList from "./EasyLivingComp.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import ListViewTable from "../components/ListViewTable.js";
import ImageLabelButton from "../components/ImageLabelButton.js";
import {DBText} from "../components/HideableView.js"



let lebar =  Dimensions.get('window').width; 
let strip = 0;
let Result = [];


export default class EasyAdminLocScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Admin Loc"
    };
  };

  constructor(props) {
    super(props);
    this.state={
    }     
  }





  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
      <ScrollView style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{marginLeft:10}}>
          <View style={{height:30}}/>
          <Text style={{color:'#707070', height:30, textAlign:'left', textAlignVertical:'center', fontSize:20, backgroundColor: 'transparent'}}>
            Anda berada di lokasi
          </Text>
          <Text style={{color:'#808080', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
                Cluster:
            <Text style={{color:'darkmagenta', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:"bold", backgroundColor: 'transparent'}}>
                {' '}Mediterania
            </Text>
          </Text>
          <Text style={{color:'#707070', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
            RT:
            <Text style={{color:'darkmagenta', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:"bold", backgroundColor: 'transparent'}}>
                {' '}05
            </Text>
            <Text style={{color:'gray', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:"bold", backgroundColor: 'transparent'}}>
              {'      '}ketua RT:
            </Text>
            <Text style={{color:'darkmagenta', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:"bold", backgroundColor: 'transparent'}}>
                {' '}Amin Adullah
            </Text>
          </Text>
          <Text style={{color:'#707070', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
            RW:
            <Text style={{color:'darkmagenta', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:"bold", backgroundColor: 'transparent'}}>
                {' '}01
            </Text>
            <Text style={{color:'gray', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:"bold", backgroundColor: 'transparent'}}>
              {'      '}ketua RW:
            </Text>
            <Text style={{color:'darkmagenta', height:20, textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:"bold", backgroundColor: 'transparent'}}>
                {' '}Bambang Purwanto
            </Text>
          </Text>
        </View>
      </ScrollView>   
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