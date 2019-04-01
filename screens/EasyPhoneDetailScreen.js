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
import ImageLabelButton from "../components/ImageLabelButton.js";
import Communications from "react-native-communications"
import {DBText, ActionIconButton, updateTable, queryTable} from "../components/react-native-improva.js"
import localStorage from 'react-native-sync-localstorage'



export default class EasyPhoneDetailScreen extends React.Component {
  
  needRefresh = false;

  static navigationOptions = ({ navigation }) => {
    return{
      title: "Contact Detail",
      headerStyle: {backgroundColor: '#e7e9df'},

    };
  };

  constructor(props) {
    super(props);
    this.state={
      FLkey : 0,
      param : this.props.navigation.getParam('Data', []),
    }
    if(this.props.navigation.state.params.Data==undefined){
      queryTable('select * from easyliving.tbphone where ID='+this.props.navigation.state.params.ID)
      .then((response) => response.json())
      .then((responseJson) => {
        let vjs = responseJson;
        this.setState({param:responseJson[0]}) 
      }).catch((error)=> console.error(error)); 
    }
  }


  componentDidMount(){
    this._sub = this.props.navigation.addListener('didFocus',this._componentFocused);
  }
     
  componentWillUnmount() {
    this._sub.remove();
  }
      
  _componentFocused = () => {
    if(this.needRefresh) {
      queryTable('select * from easyliving.tbphone where ID='+this.state.param.ID)
        .then((response) => response.json())
        .then((responseJson) => {
          let vjs = responseJson;
          this.setState({param:responseJson[0]}) 
        }).catch((error)=> console.error(error)); 
      this.needRefresh = false;
    }
  }

  onGoBack = (data) => {
    this.needRefresh = true;
    if(this.props.navigation.state.params.onGoBack!=undefined){
      this.props.navigation.state.params.onGoBack('from detail edit');
    }
  }; 

  onDeleteResult(result){
    if(result='success'){Alert.alert('success','Contact telah berhasil didelete')}
    else {Alert.alert('Fail','Contact gagal didelete')}
  }

  deleteItem=()=>{
    query = "DELETE FROM easyliving.tbphone WHERE ID="+this.state.param.ID;
    updateTable(query, this.onDeleteResult)
    if(this.props.navigation.state.params.onGoBack!=undefined){
      this.props.navigation.state.params.onGoBack('from detail delete');
    }
    this.props.navigation.goBack();
  }

  askDeleteContact=()=>{
    if(this.state.param.AddBy!=localStorage.getItem('userData').ID){Alert.alert('Error','Anda tidak berwenang mendelete contact ini');return}
    Alert.alert('Konfirmasi','Setuju untuk menghapus nomor contact ini?',
      [
        {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel'},
        {text: 'OK', onPress:() => this.deleteItem()},
      ],
      {cancelable: false},
    );    
  }   

  askEditContact=()=>{
    if(this.state.param.AddBy!=localStorage.getItem('userData').ID){Alert.alert('Error','Anda tidak berwenang mengedit contact ini');return}
    this.props.navigation.navigate("EasyPhoneAdd", {Data:this.state.param, onGoBack:this.onGoBack});
  }


  render() {
    let lebar =  Dimensions.get('window').width; 
    var vArr=[];
    if(this.state.param.Number!=undefined){
      var vArr = (this.state.param.Number).split(','); 
    }
    var moment = require('moment');
    if(this.state.param.AddOn!=null){AddOnDate = moment(moment(this.state.param.AddOn).format()).format("DD MMM YYYY  HH:mm:ss")} else {let AddOnDate=''};
    if(this.state.param.EditOn!=null){EditOnDate = moment(moment(this.state.param.EditOn).format()).format("DD MMM YYYY  HH:mm:ss")} else {let EditOnDate=''};
    vQueryAddBy = this.state.param.AddBy!=null?'SELECT Nama AS Value FROM tbuser WHERE ID='+this.state.param.AddBy+';':'';
    vQueryEditBy = this.state.param.EditBy!=null?'SELECT Nama AS Value FROM tbuser WHERE ID='+this.state.param.EditBy+';':'';
    vQueryKategori = 'SELECT Nama AS Value FROM tbphonekategori WHERE ID='+this.state.param.KategoriID;
    return (
      <View style={{flex:1, marginBottom:10, backgroundColor: 'white'}}>
         <View style={{justifyContent: 'space-around', flexDirection:"row", height:60, paddingTop:5, alignItems:'center',  backgroundColor:'#f4f4f4'}}>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.askEditContact} name="edit" label='Edit'/>
          <ActionIconButton color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.askDeleteContact} name="trash-o" label='Delete'/>
        </View>
        <View style={{width:lebar, height:1, backgroundColor:'lightgray'}}/>

        <ScrollView style={{marginLeft:0, backgroundColor:'#f8f8f8'}}>
          <View style={{height:20}}/>

          <View style={{marginLeft:5, backgroundColor:this.state.param.Level==1?this.state.param.BackColor:'white', borderRadius:5, width:lebar-15, paddingLeft:10, paddingTop:10, paddingBottom:20}}>
          <Text key={this.state.FLkey} style={{color:'#707070', marginTop:5, textAlign:'left', textAlignVertical:'center', fontSize:22, fontWeight:"bold", backgroundColor: 'transparent'}}>
            {this.state.param.Nama}
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
            {this.state.param.Deskripsi} 
          </Text>
          </View>
          <View style={{height:20}}/>

          <View style={{marginLeft:5, backgroundColor:'white', borderRadius:5, width:lebar-15, paddingLeft:10, paddingTop:10, paddingBottom:10}}>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:14, backgroundColor: 'transparent'}}>
            Kategori: 
          </Text>
          <DBText query={vQueryKategori} onEmptyText='' style={{color:'steelblue', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}/>
          <View style={{height:15}}/>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:14, backgroundColor: 'transparent'}}>
            Ditambahkan oleh: 
          </Text>
          <DBText query={vQueryAddBy} onEmptyText='Admin' style={{color:'dodgerblue', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}/>
          <Text style={{color:'#404040', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
          {this.state.param.AddOn!=null?AddOnDate:""}
          </Text>
          <View style={{height:15}}/>
          <Text style={{color:'#a0a0a0', textAlign:'left', textAlignVertical:'center', fontSize:14, backgroundColor: 'transparent'}}>
            Diedit oleh: 
          </Text>
          <DBText query={vQueryEditBy} onEmptyText='-' style={{color:'dodgerblue', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}/>
          <Text style={{color:'#404040', marginLeft:15, textAlign:'left', textAlignVertical:'center', fontSize:16, backgroundColor: 'transparent'}}>
          {this.state.param.EditOn!=null?EditOnDate:""}
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