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
import {updateTable, uploadImage, RupiahFormat, DBText} from '../components/react-native-improva.js';
import Slideshow from 'react-native-image-slider-show';


export default class EasyTradePasangConfirmScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      kategoriID : 0,
      kategoriNama : '',
    }
  };

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    alert(errorInfo);
    // You can also log error messages to an error reporting service here
  }
 
//  if(updateTable(query)){Alert.alert('Sucess','Iklan berhasil dipasang')}else{Alert.alert('Error','Iklan gagal dipasang')}

  onUpdateResult(result){
    if(result='success'){Alert.alert('Sucess','Iklan telah berhasil disimpan')}
    else {Alert.alert('Fail','Iklan gagal disimpan')}
  }

  confirmPasang=()=>{
    const {params} = this.props.navigation.state;
    if(params.ImgFilename1!=''){  
      uploadImage(params.Imguri1,params.ImgFilename1,()=>Alert.alert('Success','Gambar berhasil diupload'),()=>Alert.alert('Error','Gagal'));
    }
    {
      console.log('confirm pasang: '+JSON.stringify(params))
      var moment = require('moment');
      var Tanggal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      if(params.ID==0){
        var query = 'INSERT INTO easyliving.tbeasytrade (UserID, Tanggal, Nama, KategoriID, Deskripsi, Harga, Gambar, NoContact) VALUES ('+params.UserID+', "'+Tanggal+'", "'+params.Nama+'", '+params.KategoriID+', "'+params.Deskripsi+'", '+params.Harga+', "'+params.ImgFilename1+'", "'+params.NoContact+'");';
        updateTable(query, this.onUpdateResult)
        this.props.navigation.state.params.onGoBack('from confirm');
        this.props.navigation.navigate("EasyTrade");
      } else {
        if(params.ImgFilename1!=''){
          var query = 'UPDATE easyliving.tbeasytrade SET UserID='+params.UserID+', Tanggal="'+Tanggal+'", Nama="'+params.Nama+'", KategoriID='+params.KategoriID+', Deskripsi="'+params.Deskripsi+'", Harga='+params.Harga+', Gambar="'+params.ImgFilename1+'", NoContact="'+params.NoContact+'" WHERE ID='+params.ID;;
        } else {
          var query = 'UPDATE easyliving.tbeasytrade SET UserID='+params.UserID+', Tanggal="'+Tanggal+'", Nama="'+params.Nama+'", KategoriID='+params.KategoriID+', Deskripsi="'+params.Deskripsi+'", Harga='+params.Harga+', NoContact="'+params.NoContact+'" WHERE ID='+params.ID;;
        }  
        console.log('apakah gambar: '+query);
        updateTable(query, this.onUpdateResult);
        if(this.props.navigation.state.params.onGoBack!=undefined){
          this.props.navigation.state.params.onGoBack('from confirm');
        }
        this.props.navigation.navigate("EasyTrade");
      }
      }
  }


  /*
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
    }).then((response) => {
        console.log(JSON.stringify(response));
        response.json()
    }
    ).then((responseJson) => {
      if(responseJson['deskripsi']='Data berhasil di simpan'){return true}else{return false}
    }).catch((error) => {
      console.error(error);
    });
  }  

  */
  drawRow=()=>{
    const {params} = this.props.navigation.state;  
    console.log(JSON.stringify(params.Imguri1));
    console.log(JSON.stringify(params.ImgFilename1));
    return(
        <View style={{height:120, flexDirection:"row", alignItems:'flex-start', marginBottom:8, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Image source={{uri: params.Imguri1}} style={{marginTop:10, marginLeft:10, width:80, height:80, borderRadius:3, resizeMode: 'stretch'}}/>
        <View style={{flex:1, alignItems:'flex-start', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'bottom', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {params.Nama}
          </Text>
          <Text numberOfLines={2} style={{color:'#b0b0b0', marginTop:10, marginBottom:10, textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {params.Deskripsi}
          </Text>
          <Text style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Rp. '+params.Harga}
          </Text>
        </View>
      </View>   
    )
  }


  render() {
    let lebar =  Dimensions.get('window').width; 
    const {params} = this.props.navigation.state;
    var moment = require('moment');
    let vDate = moment(moment(params.Tanggal).format("YYYY-MM-DD HH:mm:ss")).format("DD MMM YYYY HH:mm:ss");
    let vQuery = 'SELECT Nama AS Value FROM easyliving.tbuser WHERE ID='+params.UserID+';';
    let vQueryKategori = 'SELECT Nama AS Value FROM easyliving.tbeasyrentkategori WHERE ID='+params.KategoriID+';';

    return (
      <View style={{flex:1}}>
      <View style={{marginLeft:10, marginRight:10, backgroundColor:'white'}}>
        <View style={{height:30}}/>
        <Text style={{color:'#707070', height:40, textAlign:'center', textAlignVertical:'center', fontSize:18, backgroundColor: 'transparent'}}>
            Setuju untuk memasang iklan berikut?
        </Text>
        <View style={{height:50, marginLeft:20, marginRight:20}}>
          <Button buttonStyle={{height:50, backgroundColor:'mediumseagreen'}}
                raised
                onPress={this.ConfirmPasang}
                title="Confirm"
                borderRadius={5}
                color="#841584"
            />                
        </View>
        <View style={{height:20}}/>
      </View>
      <View style={{height:5, backgroundColor:'#f4f4f4'}}/>
      <ScrollView  style={{flex:1, backgroundColor:'#f4f4f4'}}>
        <View style={{margin:5, height:lebar-70, borderRadius:5, justifyContent:'center', alighItems:'center', backgroundColor:'white'}}>
          <Slideshow 
            dataSource={[
              {url: params.Imguri1},
              {url: params.Imguri2},
              {url: params.Imguri3},
            ]}
            height={lebar*3/4}
          />     
        </View>
        <View style={{margin:5,  borderRadius:5, backgroundColor:'#fcfcfc'}}>
            <Text style={{color:'gray', marginLeft:10, marginTop:5, textAlign:'left', textAlignVertical:'top', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {params.Nama}
            </Text>
            <View style={{height:10}}/>
            <Text style={{color:'gray', marginLeft:10, marginRight:10, marginTop:5, marginBottom:10, textAlign:'left', textAlignVertical:'top', fontSize:18, backgroundColor: 'transparent'}}>
              {params.Deskripsi}
            </Text>
        </View>
        <View style={{margin:5, paddingLeft:10, paddingTop:20, paddingBottom:10, paddingRight:10, borderRadius:5, backgroundColor:'white'}}>
            <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Harga: '}
              <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                {RupiahFormat(params.Harga)}
              </Text>
            </Text>
          <View style={{height:15}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Kategori: '}
            <DBText query={vQueryKategori} onGetText={(text)=> {this.kategoriNama=text}} style={{color:'dodgerblue'}}/>
          </Text>
          <View style={{height:15}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Dipasang oleh: '}
            <DBText query={vQuery} style={{color:'dodgerblue'}}/>
          </Text>
          <View style={{height:15}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Pada tanggal: '}
            <Text style={{color:'dodgerblue'}}>
              {vDate}
            </Text>
          </Text>
          <View style={{height:15}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Hubungi pemasang iklan di no.: '}
            <Text style={{color:'dodgerblue'}}>
              {params.NoContact}
            </Text>
          </Text>
          <View style={{height:60}}/>
        </View>
      </ScrollView>
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