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
import ListViewTable from "../components/ListViewTable.js";
import ImageLabelButton from "../components/ImageLabelButton.js";
//import HideableView from "../components/HideableView.js"
import {ActionIconButton, DBFlatList, DBSectionList, DBViewList,TextOfMySQLDate} from '../components/react-native-improva.js';




let lebar =  Dimensions.get('window').width; 
let strip = false;
let ID = 0;

export default class EasyMartKerangjangScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: navigation.getParam('KategoriNama',''),
      headerStyle: {backgroundColor: '#e7e9df'},
    };
  };

  constructor(props) {
    super(props);
    this.state={
      isKategoriModalVisible : false,
    }     
  }


  drawItem = (item) => {
    if(item.Level==0){
      if(this.strip==0){this.strip=1}else{this.strip=0}}
    var vArr = (item.Number).split(',');     
    return(
      <TouchableOpacity onPress={()=>this.showPhoneDetailScreen(item)}>
        <View style={{flex:1, height:item.Level==1?100:70, flexDirection:"column",  paddingTop:10, paddingLeft: 10, marginBottom:2, marginLeft:0, marginRight:0, backgroundColor:item.Level==1?item.BackColor:this.strip==0?'white':'#f9f9f9'}}>
          <Text style={{flex:0.5, color:'gray', textAlign:'left', textAlignVertical:'top', fontSize:18, fontWeight:item.Level==1?'bold':'normal', backgroundColor: 'transparent'}}>
            {item.Nama}
          </Text>
          <Text style={{color:'gray', width:lebar, textAlign:'left', textAlignVertical:'top', fontSize:14, backgroundColor: 'transparent'}}>
            {item.Level==1?item.Deskripsi:''}
          </Text>
          <View style={{flex:0.5, flexDirection:"row", justifyContent:"flex-end", alignItems:'flex-end', paddingBottom:10, backgroundColor: 'transparent'}}>
            <Text style={{color:'darkmagenta', paddingRight:10, textAlign:'right', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {item.Number}
            </Text>
          </View>
        </View>   
      </TouchableOpacity>
    )
  }


  render() {
    return null;
    let lebar =  Dimensions.get('window').width; 
    const {navigation} = this.props;
    vWhere = '';
    if(navigation.getParam('KategoriID', 0)!=0){
      vWhere='WHERE KategoriID='+navigation.getParam('KategoriID', 0)
    } else if(navigation.getParam('cariContact', '')!=''){
      vWhere = 'WHERE Nama LIKE "%'+navigation.getParam('cariContact', '')+'%"'
    }
//    console.log(vWhere);
   return null;
   return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
              <View style={{justifyContent: 'space-around', flexDirection:"row", height:55, paddingTop:5, alignItems:'center',  backgroundColor:'#4a485f'}}>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton onPress={null} name="list-alt" label='Ketentuan'/>
          <ActionIconButton onPress={null} name="plus" label='Tambah Contact'/>
        </View>
        <View hide={this.state.hideCari} style={{flexDirection:"row", height:55, alignItems:'center', backgroundColor:'#514e65'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              ref = "cariText"
              autoFocus = {false}
              autoCapitalize = "none"
              onSubmitEditing = {null}
            />
            <Icon.Button style={{height:40, paddingLeft:18, marginTop:0, paddingTop:7}}
              name="search"
              backgroundColor="#3a384f"//</View>#3b5998"
              onPress={null}
            />
        </View>
        <View style={{width:lebar, height:3, backgroundColor:'lightgray'}}/>

        <DBFlatList style={{flex:1, paddingTop:2, paddingLeft:0, paddingRight:0, backgroundColor:'#f0f0f0'}}
          query = {'SELECT * FROM easyliving.tbbelanja '+vWhere}
          onRenderItem={this.drawItem}
          onTableEmpty = {() => {Alert.alert('eLiving','Sorry, the contact you are looking for is not available')}}
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