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
  Picker,
  TextInput,
  Alert,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import EasyRentKategoriList from "./EasyLivingComp.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, ListItem } from 'react-native-elements';
import ImageLabelButton from "../components/ImageLabelButton.js";
import {ActionIconButton, DBFlatList, renderIf, DBSectionList, DBViewList,TextOfMySQLDate} from '../components/react-native-improva.js';
import { NavigationEvents } from 'react-navigation';



let lebar =  Dimensions.get('window').width; 
let strip = false;
let ID = 0;

export default class EasyPhoneNumberScreen extends React.Component {

  needRefresh = false;
  whereQuery = '';


  static navigationOptions = ({ navigation }) => {
    return{
      title: navigation.getParam('kategoriNama',''),
      headerStyle: {backgroundColor: '#e7e9df'},
    };
  };

  constructor(props) {
    super(props);
    this.state={
      isKategoriModalVisible : false,
      FLkey : 1, 
    }     
  }

  componentDidMount(){
    this._sub = this.props.navigation.addListener('didFocus',this._componentFocused);
  }
     
  componentWillUnmount() {
    this._sub.remove();
  }
      
  _componentFocused = () => {
    console.log('getfocused: ');
    if(this.needRefresh) {
      this.setState({FLkey: Math.random()});
      this.needRefresh = false;
    }
  }

  showEasyPhoneAddScreen=()=>{
    const {kategoriID, kategoriNama} = this.props.navigation.state.params;
    this.props.navigation.navigate("EasyPhoneAdd", {kategoriID:kategoriID, kategoriNama:kategoriNama, onGoBack:this.onGoBack});
  }   

  showPhoneDetailScreen=(dataJson)=>{
    this.props.navigation.navigate("EasyPhoneDetail", {Data:dataJson, onGoBack:this.onGoBack});
  }    

  showKetentuan=()=>{
    this.props.navigation.navigate("Ketentuan", {Topik:'eContact'});
  }    

  cariContact=()=>{
    this.props.navigation.setParams({kategoriID: 0});
    this.props.navigation.setParams({cariContact: this.refs.cariText._lastNativeText});
  } 

  drawItem = (item) => {
    if(item.Level==0){
      if(this.strip==0){this.strip=1}else{this.strip=0}}
    var vArr = (item.Number).split(',');
    vDeskripsi =  item.Level==1?item.Deskripsi:'';
//    vDeskripsi = vDeskripsi.length>100?vDeskripsi.substring(0,100)+'....':vDeskripsi;    
    return(
      <TouchableOpacity onPress={()=>this.showPhoneDetailScreen(item)}>
        <View style={{flex:1, height:item.Level==1?110:70, flexDirection:"column",  paddingTop:7, paddingLeft: 10, marginBottom:2, marginLeft:0, marginRight:0, backgroundColor:item.Level==1?item.BackColor:this.strip==0?'white':'#f9f9f9'}}>
          <Text style={{flex:0.6, color:'#404040', textAlign:'left', textAlignVertical:'top', fontSize:18, fontWeight:item.Level==1?'bold':'normal', backgroundColor: 'transparent'}}>
            {item.Nama}
          </Text>
          {renderIf(item.Level>0,
          <Text numberOfLines={2} style={{color:'#505050', width:lebar, textAlign:'left', textAlignVertical:'top', fontSize:14, paddingRight:10, backgroundColor: 'transparent'}}>
            {vDeskripsi}
          </Text>
          )}
          <View style={{flex:0.4, flexDirection:"row", justifyContent:"flex-end", alignItems:'flex-end', paddingBottom:10, backgroundColor: 'transparent'}}>
            <Text style={{color:'darkmagenta', paddingRight:10, textAlign:'right', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {item.Number}
            </Text>
          </View>
        </View>   
      </TouchableOpacity>
    )
  }

  onGoBack = (data) => {
    console.log('onGoBack: '+data);
    this.needRefresh = true;
  }; 

  render() {
    let lebar =  Dimensions.get('window').width; 
    const {navigation} = this.props;
    if(navigation.getParam('kategoriID', 0)!=0){
      this.whereQuery='WHERE KategoriID='+navigation.getParam('kategoriID', 0)
    } else if(navigation.getParam('cariContact', '')!=''){
      this.whereQuery = 'WHERE Nama LIKE "%'+navigation.getParam('cariContact', '')+'%"'
    }
    console.log('render: '+this.whereQuery);
   return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <NavigationEvents
          onWillFocus={() => {
          }}
        />
        <View style={{justifyContent: 'space-around', flexDirection:"row", height:55, paddingTop:5, alignItems:'center',  backgroundColor:'#f4f4f4'}}>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showKetentuan} name="list-alt" label='Ketentuan'/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.showEasyPhoneAddScreen} name="plus" label='Tambah'/>
        </View>
        <View hide={this.state.hideCari} style={{flexDirection:"row", height:55, alignItems:'center', backgroundColor:'#514e65'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              ref = "cariText"
              autoFocus = {false}
              autoCapitalize = "none"
              onSubmitEditing = {this.cariContact}
            />
            <Icon.Button style={{height:40, paddingLeft:18, marginTop:0, paddingTop:7}}
              name="search"
              backgroundColor="#3a384f"//</View>#3b5998"
              onPress={this.cariContact}
            />
        </View>
        <View style={{width:lebar, height:3, backgroundColor:'lightgray'}}/>

        <DBFlatList style={{flex:1, paddingTop:2, paddingLeft:0, paddingRight:0, backgroundColor:'#f0f0f0'}}
          query = {'SELECT * FROM easyliving.tbphone '+this.whereQuery+' ORDER By Nama ASC' }
          onRenderItem={this.drawItem}
          onTableEmpty = {() => {Alert.alert('Error','Maaf, contact yang anda cari tidak tersedia')}}
          limit = {10}
          key = {this.state.FLkey}
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