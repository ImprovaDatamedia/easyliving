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
import {DBText, ImageAlter, ActionIconButton, updateTable, RupiahFormat} from "../components/react-native-improva.js"



export default class EasyRentDetailScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Iklan Detail",
      headerStyle: {backgroundColor: '#e7e9df'},
    };
  };

  constructor(props) {
    super(props);
    this.state={
    }     
  }


  askDeleteItem=()=>{
    Alert.alert(
      'Konfirmasi',
      'Setuju untuk mengahapus iklan ini?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteItem()},
      ],
      {cancelable: false},
    );    
  }   

  deleteItem=()=>{
    let param = this.props.navigation.getParam('Data', []);
    let whereQuery = this.props.navigation.getParam('whereQuery',''); 
    query = "DELETE FROM easyliving.tbeasyrent WHERE ID="+param.ID;
    if(updateTable(query))
    {
      alert('Data berhasil dihapus');
      console.log('whereQuery: '+whereQuery)
      this.props.navigation.navigate('EasyRent',{whereQuery:whereQuery})
    }else{alert('Gagal')};
  }

  editItem=()=>{
    let param = this.props.navigation.getParam('Data', []);
    this.props.navigation.navigate("EasyRentPasang", {Data:param});
  }


  render() {
    let lebar =  Dimensions.get('window').width; 
    let param = this.props.navigation.getParam('Data', []); 
    if(param.MinWaktu>1){minWaktuSewa='minimum: '+param.MinWaktu+' '+param.Waktu} else {minWaktuSewa=''};
    if(param.MaxWaktu!=0){maxWaktuSewa='maximum: '+param.MaxWaktu+' '+param.Waktu} else {maxWaktuSewa=''};
    var moment = require('moment');
    let vDate = moment(moment(param.Tanggal).format("YYYY-MM-DD HH:mm:ss")).format("DD MMM YYYY HH:mm:ss");
    let vQuery = 'SELECT Nama AS Value FROM easyliving.tbuser WHERE ID='+param.UserID+';';
    let vQueryKategori = 'SELECT Nama AS Value FROM easyliving.tbeasyrentkategori WHERE ID='+param.KategoriID+';';
    console.log('hallo');
    return (
      <View style={{flex:1, marginBottom:10, backgroundColor: 'white'}}>
         <View style={{justifyContent: 'space-around', flexDirection:"row", height:60, paddingTop:5, alignItems:'center',  backgroundColor:'#4a485f'}}>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton onPress={this.editItem} name="edit" label='Edit'/>
          <ActionIconButton onPress={this.askDeleteItem} name="trash-o" label='Delete'/>
        </View>
        <View style={{width:lebar, height:3, backgroundColor:'lightgray'}}/>
      <ScrollView  style={{flex:1, backgroundColor:'#f8f8f8'}}>
          <View style={{margin:5, width:lebar-10, height:lebar-70, backgroundColor:'white'}}>
            <ImageAlter 
              source={{uri: 'https://www.easyliving.id/app/assets/image/'+param.Gambar}} 
              defaultSource={require('../assets/images/NoImage.png')}
              style={{flex:1, margin:0, resizeMode:'contain'}}/>
          </View>
          <View style={{height:180, paddingLeft:10, paddingTop:10, paddingBottom:10, paddingRight:10, borderRadius:0, backgroundColor:'#fcfcfc'}}>
          <Text style={{color:'gray', marginTop:5, textAlign:'left', textAlignVertical:'top', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
            {param.NamaBarang}
          </Text>
            <View style={{height:10}}/>
          <Text style={{color:'gray', marginTop:5, textAlign:'left', textAlignVertical:'top', fontSize:18, backgroundColor: 'transparent'}}>
            {param.Deskripsi}
          </Text>
          <View style={{height:20}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Kategori: '}
            <DBText query={vQueryKategori} style={{color:'darkmagenta'}}/>
          </Text>
          <View style={{height:20}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Tarif sewa: '}
            <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
              {RupiahFormat(param.Harga)+' per'+param.Waktu}
            </Text>
          </Text>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'                    '}
            <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
              {minWaktuSewa}
            </Text>
          </Text>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'                    '}
            <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
              {maxWaktuSewa}
            </Text>
          </Text>
          <View style={{height:20}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Dipasang oleh: '}
            <DBText query={vQuery} style={{color:'darkmagenta'}}/>
          </Text>
          <View style={{height:20}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Pada Tanggal: '}
            <Text style={{color:'darkmagenta'}}>
              {vDate}
            </Text>
          </Text>
        </View>
        <View style={{height:140}}/>


      </ScrollView>
      </View>   
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