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
  TextInput,
} from 'react-native';
//import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
//import EasyRentKategoriScreen from "./EasyRentKategoriScreen.js"
import ListViewTable from "../components/ListViewTable.js"
import HideableView from "../components/HideableView.js"
//import { TextInput } from 'react-native-paper';
import {Kohana} from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { ImageManipulator } from 'expo';
import {updateTable} from '../components/react-native-improva.js';


export default class EasyRentPasangConfirmScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      kategoriID : 0,
      kategoriNama : '',
    }
  };
 

  confirmPasang=()=>{
    // const {params} = this.props.navigation.state;  
    const {params} = this.props.navigation.state;  
    if(this.uploadImage())
    {
      var UserID=1;
      var moment = require('moment');
      var Tanggal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      var query = "INSERT INTO easyliving.tbeasyrent (UserID, Tanggal, NamaBarang, KategoriID, Deskripsi, Harga, Waktu, MinWaktu, MaxWaktu, Gambar) VALUES ('"+UserID+"', '"+Tanggal+"', '"+params.NamaBarang+"', '"+params.Kategori+"', '"+params.Deskripsi+"', '"+params.TarifSewa+"', '"+params.SatuanWaktu+"', '"+params.MinWaktu+"', '"+params.MaxWaktu+"', '"+params.ImgFilename1+"');"
      if(updateTable(query)){Alert.alert('Sucess','Iklan berhasil dipasang')}else{Alert.alert('Error','Iklan gagal dipasang')}
    }
      else
    {
      alert('Upload gambar gagal')
    };
  }

  putTable = (params) => {
    var UserID=1;
    var moment = require('moment');
    var Tanggal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    var vQuery = "INSERT INTO easyliving.tbeasyrent (UserID, Tanggal, NamaBarang, KategoriID, Deskripsi, Harga, Waktu, MinWaktu, MaxWaktu, Gambar) VALUES ('"+UserID+"', '"+Tanggal+"', '"+params.NamaBarang+"', '"+params.Kategori+"', '"+params.Deskripsi+"', '"+params.TarifSewa+"', '"+params.SatuanWaktu+"', '"+params.MinWaktu+"', '"+params.MaxWaktu+"', '"+params.ImgFilename1+"');"
    this.uploadImage();
    return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token : 'UPDATE',
        query : vQuery
      })
    }).then((response) => {
      let vStr = JSON.stringify(response);
      console.log(vStr);
      if(vStr.indexOf('Record Successfully Updated')!=-1){
        Alert.alert('eRent','Iklan berhasil dipasang');
      } 
      else
        {Alert.alert('eRent','Gagal memasang iklan')} 
    }).catch((error) => {
      console.error(error);
      alert('Error'); 
    });
  }
  
  uploadImage = async() => {
    console.log('upload');
    const {params} = this.props.navigation.state;  
    let formData = new FormData();

    formData.append('photo', {
     uri : params.Imguri1,
     name: params.ImgFilename1,
     type : 'image/jpg',
    });
    return fetch('http://www.easyliving.id:81/app/index.php/datalogin/uploadImage', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: formData
    }).then((response) => response.json()
    ).then((responseJson) => {
      if(responseJson['deskripsi']='Data berhasil di simpan'){return true}else{return false}
    }).catch((error) => {
      console.error(error);
    });
  }  

  drawRow=()=>{
    const {params} = this.props.navigation.state;  
    if(params.MinWaktu>1){minWaktuSewa=', min:'+params.MinWaktu+' '+params.SatuanWaktu} else {minWaktuSewa=''};
    if(params.MaxWaktu!=0){maxWaktuSewa=', max:'+params.MaxWaktu+' '+params.SatuanWaktu} else {maxWaktuSewa=''};
    console.log(JSON.stringify(params.Imguri1));
    console.log(JSON.stringify(params.ImgFilename1));
    return(
        <View style={{height:120, flexDirection:"row", alignItems:'flex-start', marginBottom:8, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Image source={{uri: params.Imguri1}} style={{marginTop:10, marginLeft:10, width:80, height:80, borderRadius:3, resizeMode: 'stretch'}}/>
        <View style={{flex:1, alignItems:'flex-start', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'bottom', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {params.NamaBarang}
          </Text>
          <Text  style={{color:'#b0b0b0', marginTop:10, marginBottom:10, textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {params.Deskripsi}
          </Text>
          <Text style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Rp. '+params.TarifSewa+' per'+params.SatuanWaktu+minWaktuSewa+maxWaktuSewa}
          </Text>
        </View>
      </View>   
    )
  }


  render() {
    let lebar =  Dimensions.get('window').width;
    return(
      <View style={{flex:1, flexDirection:"column", alignItems:'center', backgroundColor:'#f8f8f8'}}>
        <View style={{height:100, width:lebar, paddingTop:40, marginBottom:10, backgroundColor:'white'}}>    
          <Text  style={{color:'gray', textAlign:'center', textAlignVertical:'center', fontSize:18, backgroundColor: 'white'}}>
            Setuju untuk menampilkan iklan berikut?</Text>
        </View>    
        {this.drawRow()}
        <View style={{flex:1, width:lebar, paddingTop:40, marginBottom:10, backgroundColor:'white'}}>    
        <View style={{height:60}}></View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <Button buttonStyle={{height:40, width:100, backgroundColor:'mediumseagreen'}}
                raised
                onPress={this.confirmPasang}
                title="Confirm"
                borderRadius={5}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />                
            </View>
        </View>
      </View>    
    )   
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