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
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import EasyRentKategoriList from "./EasyLivingComp.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import ListViewTable from "../components/ListViewTable.js";
import ImageLabelButton from "../components/ImageLabelButton.js";
import Communications from "react-native-communications"

//import HideableView from "../components/HideableView.js"
import {DBText} from "../components/react-native-improva.js"



let lebar =  Dimensions.get('window').width; 
let strip = 0;
let Result = [];


export default class EasyPhoneDetailScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Phone Detail"
    };
  };

  constructor(props) {
    super(props);
    this.state={
      isKategoriModalVisible : false,
      kategoriID : 0,
      kategoriNama : '',
    }     
  }


  askDeletePhone=()=>{
    Alert.alert(
      'Konfirmasi',
      'Setuju untuk mengahapus nomor telephone ini?',
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
    var vArr = (dataJson.Number).split(',');  
    var moment = require('moment');
    let AddOnDate = moment(moment(dataJson.AddOn).format("YYYY-MM-DD HH:mm:ss")).format("DD MMM YYYY HH:mm:ss");
    let EditOnDate = moment(moment(dataJson.EditOn).format("YYYY-MM-DD HH:mm:ss")).format("DD MMM YYYY HH:mm:ss");
    vQueryAddBy = dataJson.AddBy!=null?'SELECT Nama AS Value FROM tbuser WHERE ID='+dataJson.AddBy+';':'';
    vQueryEditBy = dataJson.EditBy!=null?'SELECT Nama AS Value FROM tbuser WHERE ID='+dataJson.EditBy+';':'';
    return (
      <View style={{flex:1, marginBottom:10, backgroundColor: 'white'}}>
        <View style={{justifyContent: 'flex-end', paddingTop:10, paddingRight:20, flexDirection:"row", height:70, alignItems:'center',  backgroundColor:'white'}}>
            <View style={{width:60, height:50, backgroundColor:'transparent'}}>
              <TouchableOpacity onPress={this.showEasyRentKategoriScreen} style={{flexDirection:"column", justifyContent:'flex-start', alignItems:'center'}}>
                <Image source={require('../assets/images/Icons/Edit.png')} style={{width:32, height:32, shadowColor: "black", shadowOffset: { height:1, width:1}, shadowRadius:2, shadowOpacity: 0.2}}/>
                  <Text style={{color:'gray', marginTop:5, textAlign:'center', textAlignVertical:'bottom', fontSize:12, backgroundColor: 'transparent'}}>
                    Edit
                  </Text>
              </TouchableOpacity>
            </View>
            <View style={{width:20}}/>
            <View style={{width:60, height:50, backgroundColor:'transparent'}}>
              <TouchableOpacity onPress={this.askDeletePhone} style={{flexDirection:"column", justifyContent:'flex-start', alignItems:'center'}}>
                <Image source={require('../assets/images/Icons/Minus.png')} style={{width:32, height:32, shadowColor: "black", shadowOffset: { height:1, width:1}, shadowRadius:2, shadowOpacity: 0.3}}/>
                  <Text style={{color:'gray', marginTop:5, textAlign:'center', textAlignVertical:'bottom', fontSize:12, backgroundColor: 'transparent'}}>
                    Hapus
                  </Text>
              </TouchableOpacity>
            </View>
        </View>

        <ScrollView style={{marginLeft:0, backgroundColor:'#f8f8f8'}}>
          <View style={{height:20}}/>

          <View style={{marginLeft:5, backgroundColor:dataJson.Level==1?dataJson.BackColor:'white', borderRadius:5, width:lebar-15, paddingLeft:10, paddingTop:10, paddingBottom:10}}>
          <Text style={{color:'#707070', marginTop:5, textAlign:'left', textAlignVertical:'center', fontSize:22, fontWeight:"bold", backgroundColor: 'transparent'}}>
            {dataJson.Nama}
          </Text>
          <View style={{height:30}}/>
          <View style={{height:80, flexDirection:"column", alignItems:'flex-start'}}>
              {vArr.map(function(name, index){
                return(
                  <TouchableOpacity onPress={() => Communications.phonecall(vArr[index], true)}>
                  <View flexDirection='row'>
                    <Image source={require('../assets/images/Icons/Phone.png')} style={{width:32, height:32, shadowColor: "black", shadowOffset: { height:1, width:1}, shadowRadius:1, shadowOpacity: 0.3}}/>
                    <Text style={{color:'darkmagenta', height:35, paddingLeft:10, textAlign:'left', textAlignVertical:'center', fontSize:20, backgroundColor: 'transparent'}}>
                      {vArr[index].trim()}
                    </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </View>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:18, backgroundColor: 'transparent'}}>
            {dataJson.Deskripsi} 
          </Text>
          </View>
          <View style={{height:20}}/>

          <View style={{marginLeft:5, backgroundColor:'white', borderRadius:5, width:lebar-15, paddingLeft:10, paddingTop:10, paddingBottom:10}}>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:14, backgroundColor: 'transparent'}}>
            Ditambahkan oleh: 
          </Text>
          <DBText Query={vQueryAddBy} onEmptyText='Admin' style={{color:'blue', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}/>
          <Text style={{color:'#404040', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
          {dataJson.AddOn!=null?AddOnDate:""}
          </Text>
          <View style={{height:15}}/>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:14, backgroundColor: 'transparent'}}>
            Diedit oleh: 
          </Text>
          <DBText Query={vQueryEditBy} onEmptyText='-' style={{color:'blue', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}/>
          <Text style={{color:'#404040', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
          {dataJson.EditOn!=null?EditOnDate:""}
          </Text>
          <View style={{height:15}}/>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:14, backgroundColor: 'transparent'}}>
            Riwayat: 
          </Text>
          <Text style={{color:'#404040', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
            {''}
          </Text>
          <Text style={{color:'#404040', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
            {''}
          </Text>
          </View>
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