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
  moment,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import EasyRentKategoriList from "./EasyLivingComp.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import ListViewTable from "../components/ListViewTable.js";
import ImageLabelButton from "../components/ImageLabelButton.js";
//import HideableView from "../components/HideableView.js"
import {DBText} from "../components/HideableView.js"



export default class EasyRentDetailScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Iklan Detail"
    };
  };

  constructor(props) {
    super(props);
    this.state={
    }     
  }


  askDeletePhone=()=>{
    Alert.alert(
      'Konfirmasi',
      'Setuju untuk mengahapus iklan ini?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );    
  }   


  render() {
    let lebar =  Dimensions.get('window').width; 
    let dataJson = this.props.navigation.getParam('Data', []); 
    if(dataJson.MinWaktu>1){minWaktuSewa=', minimum: '+dataJson.MinWaktu+' '+dataJson.Waktu} else {minWaktuSewa=''};
    if(dataJson.MaxWaktu!=0){maxWaktuSewa=', maximum: '+dataJson.MaxWaktu+' '+dataJson.Waktu} else {maxWaktuSewa=''};
    var moment = require('moment');
    let vDate = moment(moment(dataJson.Tanggal).format("YYYY-MM-DD HH:mm:ss")).format("DD MMM YYYY HH:mm:ss");
    let vQuery = 'SELECT Nama AS Value FROM tbuser WHERE ID='+dataJson.UserID+';';
    let vQueryKategori = 'SELECT Nama AS Value FROM tbeasyrentkategori WHERE ID='+dataJson.KategoriID+';';
    return (
      <ScrollView style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{flexDirection:"column", justifyContent: 'flex-start', paddingLeft:10, alignItems:'flex-start',  backgroundColor:'white'}}>
          <Image source={{uri: 'https://www.klikteknik.com/wp-content/uploads/'+dataJson.Gambar}} style={{marginTop:10, marginLeft:10, width:lebar, height:lebar, resizeMode: 'stretch'}}/>
          {/*<Image source={'uri:'+dataJson.Gambar} style={{width:lebar, height:lebar, shadowColor: "black", shadowOffset: { height:1, width:1}, shadowRadius:6, shadowOpacity: 0.3}}/> */}
          <View style={{height:10}}/>
          <Text style={{color:'gray', marginTop:5, textAlign:'left', textAlignVertical:'top', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
            {dataJson.NamaBarang}
          </Text>
          <View style={{height:20}}/>
          <Text style={{color:'gray', marginTop:5, textAlign:'left', textAlignVertical:'top', fontSize:16, backgroundColor: 'transparent'}}>
            {dataJson.Deskripsi}
          </Text>
          <View style={{height:20}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Kategori: '}
            <DBText Query={vQueryKategori} style={{color:'darkmagenta'}}/>
          </Text>
          <View style={{height:20}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Tarif sewa: '}
            <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
              {'Rp. '+dataJson.Harga+' per'+dataJson.Waktu+minWaktuSewa+maxWaktuSewa}
            </Text>
          </Text>
          <View style={{height:20}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Dipasang oleh: '}
            <DBText Query={vQuery} style={{color:'darkmagenta'}}/>
          </Text>
          <View style={{height:20}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Pada Tanggal: '}
            <Text style={{color:'darkmagenta'}}>
              {vDate}
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