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
  Dimensions,
  Button,
  TextInput,
  Alert,
} from 'react-native';
//import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
//import EasyRentKategoriScreen from "./EasyRentKategoriScreen.js"
import ListViewTable from "../components/ListViewTable.js"
import {HideableView} from "../components/HideableView.js"
//import { TextInput } from 'react-native-paper';
import {Kohana} from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ActionIconButton, DBFlatList, DBViewList,TextOfMySQLDate, ImageAlter, RupiahFormat} from '../components/react-native-improva.js';


export default class EasyRentScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return{
      title: "Easy Rent"
    };
  };

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state={
      kategoriID : 0,
      kategoriNama : '',
      hideCari:true,
    }
  };



handler() {
    this.setState({
      kategoriID : this.props.navigation.state.params.kategoriID
    })
  }

  cariBarang=()=>{
    this.setState({hideCari: true});
    this.props.navigation.setParams({kategoriID: 0});
    this.props.navigation.setParams({cariBarang: this.refs.cariText._lastNativeText});
  }   
   

  showEasyRentKategoriScreen=()=>{
    //    this.setState({isKategoriModalVisible:!this.state.isKategoriModalVisible})
        this.props.navigation.navigate("EasyRentKategori", {callerScreen:"EasyRent"});
      }   
    
  showKetentuan=()=>{
    var moment = require('moment');
    var Tanggal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    alert(Tanggal);
    this.props.navigation.navigate("EasyRentPasang");
  }   
    
    

  showRentDetailScreen=(dataJson)=>{
    this.props.navigation.navigate("EasyRentDetail", {Data:dataJson});
  }   

  showEasyRentPasangScreen=()=>{
    this.props.navigation.navigate("EasyRentPasang");
  }   

  drawRow = (dataJson) => {
//    console.log(dataJson.NamaBarang);
    if(dataJson.MinWaktu>1){minWaktuSewa=', min: '+dataJson.MinWaktu+' '+dataJson.Waktu} else {minWaktuSewa=''};
    if(dataJson.MaxWaktu!=0){maxWaktuSewa=', max: '+dataJson.MaxWaktu+' '+dataJson.Waktu} else {maxWaktuSewa=''};
    return(
      <TouchableOpacity onPress={()=>this.showRentDetailScreen(dataJson)}>
      <View key={dataJson.ID} style={{flex:1, flexDirection:"row", alignItems:'flex-start', marginBottom:8, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
        <Image source={{uri: 'https://www.easyliving.id/app/assets/image/'+dataJson.Gambar}} style={{marginTop:10, marginLeft:10, width:80, height:80, resizeMode: 'stretch'}}/>
        <View style={{flex:1, alignItems:'flex-start', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'bottom', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {dataJson.NamaBarang}
          </Text>
          <Text  style={{color:'#b0b0b0', marginTop:10, marginBottom:10, textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {dataJson.Deskripsi}
          </Text>
          <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {RupiahFormat(dataJson.Harga)+' per'+dataJson.Waktu+minWaktuSewa+maxWaktuSewa}
          </Text>
        </View>
      </View>   
      </TouchableOpacity>
    )
  }

  sayEmpty = () => {
    return(
      <View key='1' style={{flex:1, alignItems:'center', marginTop:28, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'transparent'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:18, fontWeight:'normal', backgroundColor: 'transparent'}}>
            Tidak ada item dalam kategori ini
          </Text>
      </View>   
    )
  }


  selectKategori=(kategoriID, kategoriNama)=>{
    this.setState({kategoriID:kategoriID});
    this.setState({kategoriNama:kategoriNama});
    this.setState({isKategoriModalVisible:false});
  }   

  render() {
    let lebar =  Dimensions.get('window').width; 
    const {navigation} = this.props;
    vWhere = '';
    if(navigation.getParam('kategoriID', 0)!=0){
      vWhere='WHERE KategoriID='+navigation.getParam('kategoriID', 0)
    } else if(navigation.getParam('cariBarang', '')!=''){
      vWhere = 'WHERE NamaBarang LIKE "%'+navigation.getParam('cariBarang', '')+'%"'
    }
    console.log(vWhere);
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{alignItems:'center', marginTop:0, marginBottom:0, marginLeft:0, marginRight:0, paddingTop:0, paddingBottom:0, backgroundColor:'white'}}>
          <Image style={{borderRadius:0, width:lebar, height: lebar*(1/2.5), resizeMode: 'stretch'}} 
          source={{uri:'https://www.easyliving.id/images/rent/bukalapak.jpg'}}/>
        </View>
        <View style={{justifyContent: 'space-around', flexDirection:"row", height:50, paddingTop:5, alignItems:'center',  backgroundColor:'#4a485f'}}>
          <ActionIconButton onPress={this.showEasyRentKategoriScreen} name="list" label='Kategori'/>
          <ActionIconButton onPress={()=> this.setState({hideCari: !this.state.hideCari})} name="search" label='Cari'/>
          <ActionIconButton onPress={this.showKetentuan} name="list-alt" label='Ketentuan'/>
          <ActionIconButton onPress={this.showEasyRentPasangScreen} name="plus" label='Pasang Iklan'/>
        </View>
        <HideableView hide={this.state.hideCari} style={{flexDirection:"row", height:55, alignItems:'center', backgroundColor:'#514e65'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              ref = "cariText"
              autoFocus = {true}
              autoCapitalize = "none"
              onSubmitEditing = {this.cariBarang}
            />
            <Icon.Button style={{height:40, paddingLeft:18, marginTop:0, paddingTop:7}}
              name="search"
              backgroundColor="#3a384f"//</View>#3b5998"
              onPress={this.cariBarang}
            />
        </HideableView>

        <DBFlatList style={{flex:1, paddingTop:2, paddingLeft:0, paddingRight:0, backgroundColor:'#f0f0f0'}}
          query = {'SELECT * FROM tbeasyrent '+vWhere} 
          onRenderItem = {this.drawRow}
          onTableEmpty = {() => {Alert.alert('eLiving','No item available in this category')}}
          limit = {10}
        />
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