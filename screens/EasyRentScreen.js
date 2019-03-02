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
import Moment from 'react-moment';

export default class EasyRentScreen extends React.Component {
  
  cariText ='cari...';

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
    this.props.navigation.setParams({cariBarang: this.cariText});
  }   
 

  cariChangeText=(text)=>{
    this.cariText = text;
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


  drawRow = (dataJson) => {
//    console.log(dataJson.NamaBarang);
    if(dataJson.MinWaktu>1){minWaktuSewa=', min: '+dataJson.MinWaktu+' '+dataJson.Waktu} else {minWaktuSewa=''};
    if(dataJson.MaxWaktu!=0){maxWaktuSewa=', max: '+dataJson.MaxWaktu+' '+dataJson.Waktu} else {maxWaktuSewa=''};
    return(
      <TouchableOpacity onPress={()=>this.showRentDetailScreen(dataJson)}>
      <View key={dataJson.ID} style={{flex:1, flexDirection:"row", alignItems:'flex-start', marginBottom:8, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
        <Image source={{uri: 'https://www.klikteknik.com/wp-content/uploads/'+dataJson.Gambar}} style={{marginTop:10, marginLeft:10, width:80, height:80, resizeMode: 'stretch'}}/>
        <View style={{flex:1, alignItems:'flex-start', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'bottom', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {dataJson.NamaBarang}
          </Text>
          <Text  style={{color:'#b0b0b0', marginTop:10, marginBottom:10, textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {dataJson.Deskripsi}
          </Text>
          <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:14, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Rp. '+dataJson.Harga+' per'+dataJson.Waktu+minWaktuSewa+maxWaktuSewa}
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
    if(navigation.getParam('kategoriID', 0)!=0){
      vWhere='WHERE KategoriID='+navigation.getParam('kategoriID', 'ID')+';'
    } else if(navigation.getParam('cariBarang', '')!=''){
      vWhere = 'WHERE NamaBarang LIKE "%'+navigation.getParam('cariBarang', '')+'%";'
    } else {vWhere=';'}
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{alignItems:'center', marginTop:1, marginBottom:3, marginLeft:7, marginRight:7, paddingTop:5, paddingBottom:5, backgroundColor:'white'}}>
          <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/2.5), resizeMode: 'stretch'}} 
          source={{uri:'https://www.easyliving.id/images/rent/bukalapak.jpg'}}/>
        </View>
        <View style={{justifyContent: 'space-around', flexDirection:"row", height:50, alignItems:'center',  backgroundColor:'white'}}>
          <TouchableOpacity onPress={this.showEasyRentKategoriScreen}>
            <Image source={require('../assets/images/EasyRent/iconKategori.png')} style={{width:40, height:40}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.setState({hideCari: !this.state.hideCari})}>
            <Image source={require('../assets/images/EasyRent/iconCari.png')} style={{width:40, height:40}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showKetentuan}>
            <Image source={require('../assets/images/EasyRent/iconKetentuan.png')} style={{width:40, height:40}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showEasyRentPasangScreen}>
            <Image source={require('../assets/images/EasyRent/iconPasangIklan.png')} style={{width:40, height:40}}/>
          </TouchableOpacity>
        </View>
        <HideableView hide={this.state.hideCari} style={{flexDirection:"row", height:55, alignItems:'stretch',  backgroundColor:'white'}}>
          <View style={{height:55, flexDirection:"row", alignItems:'center', backgroundColor:'white'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {this.cariChangeText}
              onSubmitEditing = {this.cariBarang}
            />
            <Icon.Button style={{height:40, paddingLeft:18, marginTop:0, paddingTop:7}}
              name="search"
              backgroundColor="dodgerblue"//</View>#3b5998"
              onPress={this.cariBarang}
            ></Icon.Button>
          </View>
        </HideableView>
        <ScrollView style={{paddingTop:7, paddingLeft:5, paddingRight:5, backgroundColor:'#f2f2f2'}}>   
        <ListViewTable ref={component => this._ListViewTable = component}
          Query = {'SELECT * FROM tbeasyrent '+vWhere}
          onRenderRow = {this.drawRow}
          onTableEmpty = {this.sayEmpty}
        />
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