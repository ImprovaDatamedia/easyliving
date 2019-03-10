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
import {DBText, ActionIconButton, updateTable} from "../components/react-native-improva.js"



let lebar =  Dimensions.get('window').width; 
let strip = 0;
let Result = [];


export default class EasyPhoneDetailScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Contact Detail",
      headerStyle: {backgroundColor: '#e7e9df'},

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


  askDeleteContact=()=>{
    Alert.alert(
      'Konfirmasi',
      'Setuju untuk mengahapus nomor Contact ini?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress:() => this.deleteItem()},
      ],
      {cancelable: false},
    );    
  }   



  deleteItem=()=>{
    let param = this.props.navigation.getParam('Data', []);
    let whereQuery = this.props.navigation.getParam('whereQuery',''); 
    query = "DELETE FROM easyliving.tbphone WHERE ID="+param.ID;
    if(updateTable(query))
    {
      alert('Contact berhasil dihapus');
      console.log('whereQuery: '+whereQuery)
      this.props.navigation.navigate('EasyPhoneNumber',{whereQuery:whereQuery})
    }else{alert('Gagal')};
  }


  render() {
    let lebar =  Dimensions.get('window').width; 
    let dataJson = this.props.navigation.getParam('Data', []); 
    var vArr = (dataJson.Number).split(',');  
    var moment = require('moment');
    if(dataJson.AddOn!=null){AddOnDate = moment(moment(dataJson.AddOn).format()).format("DD MMM YYYY  HH:mm:ss")} else {let AddOnDate=''};
    if(dataJson.EditOn!=null){EditOnDate = moment(moment(dataJson.EditOn).format()).format("DD MMM YYYY  HH:mm:ss")} else {let EditOnDate=''};
    vQueryAddBy = dataJson.AddBy!=null?'SELECT Nama AS Value FROM tbuser WHERE ID='+dataJson.AddBy+';':'';
    vQueryEditBy = dataJson.EditBy!=null?'SELECT Nama AS Value FROM tbuser WHERE ID='+dataJson.EditBy+';':'';
    return (
      <View style={{flex:1, marginBottom:10, backgroundColor: 'white'}}>
         <View style={{justifyContent: 'space-around', flexDirection:"row", height:60, paddingTop:5, alignItems:'center',  backgroundColor:'#4a485f'}}>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton onPress={this.showKetentuan} name="edit" label='Edit'/>
          <ActionIconButton onPress={this.askDeleteContact} name="trash-o" label='Delete'/>
        </View>
        <View style={{width:lebar, height:3, backgroundColor:'lightgray'}}/>

        <ScrollView style={{marginLeft:0, backgroundColor:'#f8f8f8'}}>
          <View style={{height:20}}/>

          <View style={{marginLeft:5, backgroundColor:dataJson.Level==1?dataJson.BackColor:'white', borderRadius:5, width:lebar-15, paddingLeft:10, paddingTop:10, paddingBottom:10}}>
          <Text style={{color:'#707070', marginTop:5, textAlign:'left', textAlignVertical:'center', fontSize:22, fontWeight:"bold", backgroundColor: 'transparent'}}>
            {dataJson.Nama}
          </Text>
          <View style={{height:30}}/>
          <View style={{height:80, flexDirection:"column", alignItems:'flex-start'}}>
              {vArr.map(function(Number, index){
                return(
                  <TouchableOpacity key={index} onPress={() => Communications.phonecall(Number, true)}>
                  <View flexDirection='row'>
                    <Image source={require('../assets/icons/Phone.png')} style={{width:32, height:32, shadowColor: "black", shadowOffset: { height:1, width:1}, shadowRadius:1, shadowOpacity: 0.3}}/>
                    <Text style={{color:'darkmagenta', height:35, paddingLeft:10, paddingTop:5, textAlign:'left', textAlignVertical:'center', fontSize:20, backgroundColor: 'transparent'}}>
                      {Number.trim()}
                    </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </View>
          <Text style={{color:'#707070', textAlign:'left', textAlignVertical:'center', fontSize:18, backgroundColor: 'transparent'}}>
            {dataJson.Deskripsi} 
          </Text>
          </View>
          <View style={{height:20}}/>

          <View style={{marginLeft:5, backgroundColor:'white', borderRadius:5, width:lebar-15, paddingLeft:10, paddingTop:10, paddingBottom:10}}>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:14, backgroundColor: 'transparent'}}>
            Ditambahkan oleh: 
          </Text>
          <DBText query={vQueryAddBy} onEmptyText='Admin' style={{color:'blue', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}/>
          <Text style={{color:'#404040', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
          {dataJson.AddOn!=null?AddOnDate:""}
          </Text>
          <View style={{height:15}}/>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:14, backgroundColor: 'transparent'}}>
            Diedit oleh: 
          </Text>
          <DBText query={vQueryEditBy} onEmptyText='-' style={{color:'blue', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}/>
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