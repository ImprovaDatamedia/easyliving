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



let lebar =  Dimensions.get('window').width; 
let strip = false;
let ID = 0;

export default class EasyPhoneNumberScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: navigation.getParam('KategoriNama','')
    };
  };

  constructor(props) {
    super(props);
    this.state={
      isKategoriModalVisible : false,
    }     
  }

  showEasyPhoneAddScreen=(dataJson)=>{
    this.props.navigation.navigate("EasyPhoneAdd");
  }   

  showPhoneDetailScreen=(dataJson)=>{
    this.props.navigation.navigate("EasyPhoneDetail", {Data:dataJson});
  }   


  drawRow = (dataJson) => {
    if(dataJson.Level==0){
      if(this.strip==0){this.strip=1}else{this.strip=0}}
    var vArr = (dataJson.Number).split(',');  
    return(
      <TouchableOpacity onPress={()=>this.showPhoneDetailScreen(dataJson)}>
      <View key={dataJson.ID} style={{flex:1, height:dataJson.Level==1?100:70, flexDirection:"column",  paddingTop:10, paddingLeft: 10, marginBottom:2, marginLeft:0, marginRight:0, backgroundColor:dataJson.Level==1?dataJson.BackColor:this.strip==0?'white':'#f9f9f9'}}>
          <Text style={{flex:0.5, color:'gray', textAlign:'left', textAlignVertical:'top', fontSize:18, fontWeight:dataJson.Level==1?'bold':'normal', backgroundColor: 'transparent'}}>
              {dataJson.Nama}
          </Text>
          <Text style={{color:'gray', width:lebar, textAlign:'left', textAlignVertical:'top', fontSize:14, backgroundColor: 'transparent'}}>
              {dataJson.Level==1?dataJson.Deskripsi:''}
          </Text>

          <View style={{flex:0.5, flexDirection:"row", justifyContent:"flex-end", alignItems:'flex-end', paddingBottom:10, backgroundColor: 'transparent'}}>
            {vArr.map(function(name, index){
              return(
                <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={() => Communications.phonecall(name, true)}>
                  <Text style={{color:'darkmagenta', paddingRight:10, textAlign:'right', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                    {name}
                  </Text>
                </TouchableOpacity>
              )})}   
          </View>
        </View>
      </TouchableOpacity>   
    )
  }

/*  drawRow = (dataJson) => {
    var vArr = (dataJson.Number).split(',');  
    this.strip=!this.strip;
    return(
      <ListItem containerStyle={{height:170, backgroundColor:this.strip?'white':'#f8f8f8',  borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}}
        onPress={()=>this.showPhoneDetailScreen(dataJson)}
        key={dataJson.ID}
        title={dataJson.Nama}
        subtitle={dataJson.Number}
        subtitleStyle={{ color: 'darkmagenta', paddingTop:10, fontWeight:'bold'}}
        leftIcon={{ name: 'phone'}}
        chevronColor="gray"
        chevron
      />
    )
  }  
*/
  render() {
    let lebar =  Dimensions.get('window').width; 
    let vWhere = 'where KategoriID='+this.props.navigation.getParam('KategoriID', 0)+';'; 
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{justifyContent: 'flex-end', paddingTop:10, paddingRight:20, flexDirection:"row", height:60, alignItems:'center',  backgroundColor:'white'}}>
            <View style={{width:60, height:50, backgroundColor:'transparent'}}>
              <TouchableOpacity onPress={this.showEasyRentKategoriScreen} style={{flexDirection:"column", justifyContent:'flex-start', alignItems:'center'}}>
                <Image source={require('../assets/images/Icons/Question.png')} style={{width:32, height:32, shadowColor: "black", shadowOffset: { height:1, width:1}, shadowRadius:2, shadowOpacity: 0.3}}/>
                  <Text style={{color:'gray', marginTop:5, textAlign:'center', textAlignVertical:'bottom', fontSize:12, backgroundColor: 'transparent'}}>
                    Ketentuan
                  </Text>
              </TouchableOpacity>
            </View>
            <View style={{width:20}}/>
            <View style={{width:60, height:50, backgroundColor:'transparent'}}>
              <TouchableOpacity onPress={this.showEasyPhoneAddScreen} style={{flexDirection:"column", justifyContent:'flex-start', alignItems:'center'}}>
                <Image source={require('../assets/images/Icons/Plus.png')} style={{width:32, height:32, shadowColor: "black", shadowOffset: { height:1, width:1}, shadowRadius:1, shadowOpacity: 0.3}}/>
                  <Text style={{color:'gray', marginTop:5, textAlign:'center', textAlignVertical:'bottom', fontSize:12, backgroundColor: 'transparent'}}>
                    Tambah
                  </Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{flexDirection:"row", height:55, alignItems:'stretch',  backgroundColor:'white'}}>
          <View style={{height:55, flexDirection:"row", alignItems:'center', backgroundColor:'white'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#C8C8C8', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {this.cariChangeText}
              onSubmitEditing = {this.cariBarang}
            />
            <Icon.Button style={{height:40, paddingLeft:18, marginTop:0, paddingTop:7}}
              name="search"
              backgroundColor="dodgerblue"
              onPress={this.cariBarang}
            ></Icon.Button>

          </View>
        </View>

        <ScrollView style={{flex:1, paddingTop:0, paddingLeft:0, paddingRight:0, backgroundColor:'white'}}>   
          <ListViewTable
            Query = {'SELECT * FROM tbphone '+vWhere}
            onRenderRow = {this.drawRow}
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