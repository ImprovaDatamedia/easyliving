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
} from 'react-native';
import Modal from "react-native-modal";
//import EasyRentKategoriScreen from "./EasyRentKategoriScreen.js"
import {HideableView} from "./EasyLivingComp.js"
import { TextInput } from 'react-native-paper';

export default class EasyRentScreen extends React.Component {
  
  _isMounted = false ;
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state={
      kategoriID : 0,
      kategoriNama : '',
      rowData:[],
      hideCari:true,
    }
  }

handler() {
    this.setState({
      kategoriID : this.props.navigation.state.params.kategoriID
    })
  }
  
  showEasyRentKategoriScreen=()=>{
//    this.setState({isKategoriModalVisible:!this.state.isKategoriModalVisible})
    this.props.navigation.navigate("EasyRentKategori", {callerScreen:"EasyRent"});
  }   

  showEasyRentPasangScreen=()=>{
    this.props.navigation.navigate("EasyRentPasang");
  }   

  gettbRent = () => {
    var table=[];
    const { navigation } = this.props;
    if(navigation.getParam('kategoriID', 'ID')!=0){vWhere='WHERE KategoriID='+navigation.getParam('kategoriID', 'ID')+';'} else {vWhere=';'}
    return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token : 'SELECT',
        query : 'SELECT * FROM tbeasyrent '+vWhere,
      })
    }).then((response) => {
      let vStr = JSON.stringify(response);
      if(vStr.indexOf('No Results Found')==-1){return response.json()}
    }).then((responseJson) => {
      if(responseJson==undefined){table.push(this.sayEmpty())} else {
      if (responseJson.length>0){
        for(i=0;i<responseJson.length;i++){
          var val= this.drawRow(responseJson[i]);
          table.push(val);
        }
      }
    }
      if (this._isMounted) {
          this.setState({rowData:table})
        }
    }).catch((error) => {
      console.error(error);
    });
  }

  drawRow = (dataJson) => {
    if(dataJson.MinWaktu>1){minWaktuSewa=', min:'+dataJson.MinWaktu+' '+dataJson.Waktu} else {minWaktuSewa=''};
    if(dataJson.MaxWaktu!=0){maxWaktuSewa=', max:'+dataJson.MaxWaktu+' '+dataJson.Waktu} else {maxWaktuSewa=''};
    return(
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


  componentDidMount(){
    this._isMounted = true;
      this.gettbRent();
  }

  componentDidUpdate(prevState){
    this._isMounted = true;
      if(prevState.rowData !== this.state.rowData){
        this.gettbRent();
      }
  }
  componentWillUnmount(){
    this._isMounted = false;
  }

  selectKategori=(kategoriID, kategoriNama)=>{
    this.setState({kategoriID:kategoriID});
    this.gettbRent();
    this.setState({kategoriNama:kategoriNama});
    this.setState({isKategoriModalVisible:false});
  }   

  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{alignItems:'center', marginTop:3, marginBottom:3, marginLeft:7, marginRight:7, paddingTop:5, paddingBottom:5, backgroundColor:'white'}}>
          <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/3), resizeMode: 'stretch'}} 
          source={{uri:'https://www.easyliving.id/images/rent/bukalapak.jpg'}}/>
        </View>
        <View hide={this.state.hideCari} style={{flexDirection:"row", height:80, alignItems:'center',  backgroundColor:'white'}}>
          <TextInput style={{textAlligned:'top', width:340, height:40}} mode='outlined' label='lcari' value='hallo'/>
        </View>
        <HideableView style={{justifyContent: 'space-around', flexDirection:"row", height:50, alignItems:'center',  backgroundColor:'white'}}>
          <TouchableOpacity onPress={this.showEasyRentKategoriScreen}>
            <Image source={require('../assets/images/EasyRent/iconKategori.png')} style={{width:40, height:40}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.setState({hideCari: !this.state.hideCari})}>
            <Image source={require('../assets/images/EasyRent/iconCari.png')} style={{width:40, height:40}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={null}>
            <Image source={require('../assets/images/EasyRent/iconKetentuan.png')} style={{width:40, height:40}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showEasyRentPasangScreen}>
            <Image source={require('../assets/images/EasyRent/iconPasangIklan.png')} style={{width:40, height:40}}/>
          </TouchableOpacity>
        </HideableView>
        <ScrollView style={{paddingTop:7, paddingLeft:5, paddingRight:5, backgroundColor:'#f2f2f2'}}>   
          {this.state.rowData}
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