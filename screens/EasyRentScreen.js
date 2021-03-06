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
  AsyncStorage

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
import {ActionIconButton, DBFlatList, DisplayHarga, ImageAlter, RupiahFormat} from '../components/react-native-improva.js';


export default class EasyRentScreen extends React.Component {

  needRefresh = false;
  whereQuery = '';

  static navigationOptions = ({ navigation }) => {
    return{
      title: "Easy Rent",
      headerStyle: {backgroundColor: '#e7e9df'},


    };
  };

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state={
      kategoriID : 0,
      kategoriNama : '',
      hideCari:true,
      FLkey : 0,
    }
  };



handler() {
    console.log('handler');
//    this.setState({
//      kategoriID : this.props.navigation.state.params.kategoriID
//    })
  }


  cariBarang=()=>{
    this.setState({hideCari: true});
    this.props.navigation.setParams({kategoriID: 0});
    this.props.navigation.setParams({cariBarang: this.refs.cariText._lastNativeText});
  }   
   

  showEasyRentKategoriScreen=()=>{
    this.props.navigation.navigate("EasyRentKategori", {callerScreen:"EasyRent"});
  }   
    
  showKetentuan=()=>{
    var moment = require('moment');
    var Tanggal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    alert(Tanggal);
    this.props.navigation.navigate("EasyRentPasang");
  }   
    
  
  showRentDetailScreen=(dataJson)=>{
    this.props.navigation.navigate("EasyRentDetail", {Data:dataJson, onGoBack:this.onGoBack});
  }   

  showEasyRentPasangScreen= async ()=>{
    const userToken = await AsyncStorage.getItem('userToken');
//    this.props.navigation.navigate(userToken ? 'EasyRentPasang' : 'loginForm', {screenName:'EasyRentPasang'});
    this.props.navigation.navigate('EasyRentPasang',{onGoBack:this.onGoBack});
    // Alert.alert(userToken)
  } 

  renderHeader = () => {
    let lebar =  Dimensions.get('window').width; 
    return(
      <View style={{alignItems:'center', marginTop:0, marginBottom:0, marginLeft:0, marginRight:0, paddingTop:0, paddingBottom:0, backgroundColor:'white'}}>
        <Image style={{borderRadius:0, width:lebar, height: lebar*(1/2.5), resizeMode: 'stretch'}} 
          source={{uri:'http://www.easyliving.id:81/images/main/eRentalHead.png'}}/>
      </View>
    )
  }

  drawItem = (item) => {
    return(

      <View style={{flex:1, height:220, margin:6, borderRadius:5, backgroundColor:'white'}}>
      <TouchableOpacity style={{flex:1, flexDirection:'column'}} onPress={()=>this.showRentDetailScreen(item)}>
        <View style={{flex:0.55, alignItems:'center'}}>
         <ImageAlter 
              source={{uri: 'http://www.easyliving.id:81/app/assets/image/'+item.Gambar}} 
              defaultSource={require('../assets/images/NoImage.png')}
              style={{marginTop:5, marginLeft:5, width:130, height:110, borderRadius:5}}/>
        </View>
        <View style={{flex:0.45, marginLeft:5, marginRight:5}}>
          <Text numberOfLines={2} style={{color:'gray', textAlign:'left', fontSize:14, fontWeight:'bold', backgroundColor: 'transparent'}}>
            {item.NamaBarang}
          </Text>
          <Text numberOfLines={2} style={{color:'gray', height:40, textAlign:'left', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {item.Deskripsi}
          </Text>
          <DisplayHarga harga={item.Harga} style={{height:26, backgroundColor:'transparent'}}>
            <Text style={{color:'gray', textAlign:'right', alignItems:'flex-end', marginTop:2, marginBottom:0, fontSize:14, fontWeight:'normal'}}>
              {'  /'+item.SatuanWaktu}
            </Text>
          </DisplayHarga>
        </View>
        </TouchableOpacity>

      </View>
    )
  }
/*
  drawRow = (dataJson) => {
//    console.log(dataJson.NamaBarang);
    if(dataJson.MinWaktu>1){minWaktuSewa=', min: '+dataJson.MinWaktu+' '+dataJson.SatuanWaktu} else {minWaktuSewa=''};
    if(dataJson.MaxWaktu!=0){maxWaktuSewa=', max: '+dataJson.MaxWaktu+' '+dataJson.SatuanWaktu} else {maxWaktuSewa=''};
    return(
      <TouchableOpacity onPress={()=>this.showRentDetailScreen(dataJson)}>
        <View style={{flex:1, flexDirection:"row", alignItems:'flex-start', marginBottom:8, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Image source={{uri: 'http://www.easyliving.id:81/app/assets/image/'+dataJson.Gambar}} style={{marginTop:5, marginBottom:5, marginLeft:5, width:90, height:80, borderRadius:5, resizeMode: 'stretch'}}/>
        <View style={{flex:1, alignItems:'flex-start', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'bottom', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {dataJson.NamaBarang}
          </Text>
          <Text  style={{color:'#b0b0b0', marginTop:10, marginBottom:10, textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {dataJson.Deskripsi}
          </Text>
          <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {RupiahFormat(dataJson.Harga)+' per'+dataJson.SatuanWaktu+minWaktuSewa+maxWaktuSewa}
          </Text>
        </View>
      </View>   
      </TouchableOpacity>
    )
  }
*/

  sayEmpty = () => {
    return(
      <View key='1' style={{flex:1, alignItems:'center', marginTop:28, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'transparent'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:18, fontWeight:'normal', backgroundColor: 'transparent'}}>
            Tidak ada item dalam kategori ini
          </Text>
      </View>   
    )
  }

/*
  selectKategori=(kategoriID, kategoriNama)=>{
    this.setState({kategoriID:kategoriID});
    this.setState({kategoriNama:kategoriNama});
    this.setState({isKategoriModalVisible:false});
  }   
*/

  componentDidMount(){
//    this._componentFocused();
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused
    );
  }
 
  componentWillUnmount() {
    this._sub.remove();
  }
  
  _componentFocused = () => {
    console.log('getfocused');
    if(this.needRefresh) {
      this.setState({FLkey: Math.random()});
      this.needRefresh = false;

    }    
//    this.forceUpdate();
  }

  onGoBack = (data) => {
    console.log('goback: '+data);
    this.needRefresh = true;
  }; 


  render() {
    let lebar =  Dimensions.get('window').width; 
    const {navigation} = this.props;
    this.whereQuery = '';
/*    if(navigation.getParam('whereQuery',undefined)!=undefined){
      this.whereQuery = navigation.getParam('whereQuery', '')
    } else */if(navigation.getParam('kategoriID', 0)!=0){
      this.whereQuery = 'WHERE KategoriID='+navigation.getParam('kategoriID', 0)
    } else if(navigation.getParam('cariBarang', '')!=''){
      this.whereQuery = 'WHERE NamaBarang LIKE "%'+navigation.getParam('cariBarang', '')+'%"'
    }
//    console.log('whereq: '+this.whereQuery);    
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{justifyContent: 'space-around', flexDirection:"row", height:60, paddingTop:5, alignItems:'center',  backgroundColor:'#f4f4f4'}}>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showEasyRentKategoriScreen} name="list" label='Kategori'/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={()=> this.setState({hideCari: !this.state.hideCari})} name="search" label='Cari'/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showKetentuan} name="list-alt" label='Ketentuan'/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showEasyRentPasangScreen} name="plus" label='Pasang Iklan'/>
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
        <DBFlatList style={{flex:1, paddingTop:0, paddingLeft:0, paddingRight:0, backgroundColor:'#f4f4f4'}}
          query = {'SELECT * FROM easyliving.tbeasyrent ORDER BY Tanggal Desc '+this.whereQuery}  
          onRenderItem = {this.drawItem}
          onTableEmpty = {() => {Alert.alert('eLiving','No item available in this category')}}
          onRenderHeader = {this.renderHeader}
          key = {this.state.FLkey}
          limit = {20}
          numColumns = {2}

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