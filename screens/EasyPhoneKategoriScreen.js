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
import {HomeIconButton, DBFlatList, DBSectionList, DBViewList,TextOfMySQLDate} from '../components/react-native-improva.js';


let lebar =  Dimensions.get('window').width; 

export default class EasyPhoneKategoriScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Contact Category",
      headerStyle: {backgroundColor: '#e7e9df'},

    };
  };

  constructor(props) {
    super(props);
    this.state={
    }     
  }

  cariContact=()=>{
    this.props.navigation.navigate("EasyPhoneNumber", {KategoriID:0, KategoriNama:"Find Contact", cariContact:this.refs.cariText._lastNativeText});
  } 
 
  showEasyPhoneNumberScreen=(KategoriID, KategoriNama)=>{
//    console.log('Kategori ID: '+KategoriID);
    console.log(KategoriID+'  '+KategoriNama)
    this.props.navigation.navigate("EasyPhoneNumber", {KategoriID:KategoriID, KategoriNama:KategoriNama});
  }   

/*
  drawRow = (dataJson) => {
    return(
        <TouchableOpacity onPress={() => this.showEasyPhoneNumberScreen(dataJson.ID, dataJson.Nama)}>
        <View key={dataJson.ID} style={{flex:1, height:50, flexDirection:"row", alignItems:'left', marginBottom:2, marginLeft:0, marginRight:0, borderRadius:5, backgroundColor:'white'}}>
        <View style={{flex:1, alignItems:'left', paddingTop:15, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:0, backgroundColor:'white'}}>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'bottom', fontSize:20, backgroundColor: 'transparent'}}>
              {dataJson.Nama}
          </Text>
        </View>
      </View>   
      </TouchableOpacity>
    )
  }
*/
drawRow = (item) => {
  this.strip=!this.strip;
  return(
    <ListItem containerStyle={{backgroundColor:this.strip?'white':'#f8f8f8',  borderBottomWidth: 1, borderBottomColor: '#e8e8e8'}}
      onPress={()=>this.showEasyPhoneNumberScreen(item.ID, item.Nama)}
      key={item.ID}
      title={item.Nama}
      chevronColor="gray"
      chevron
  />
  )
} 

  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{alignItems:'center', marginTop:0, marginBottom:0, marginLeft:0, marginRight:0, paddingTop:0, paddingBottom:0, backgroundColor:'white'}}>
          <Image style={{borderRadius:0, width:lebar, height: lebar*(1/2.5), resizeMode: 'stretch'}} 
          source={{uri:'https://www.easyliving.id/images/rent/eContactLogo.png'}}/>
        </View>
        <View hide={this.state.hideCari} style={{flexDirection:"row", height:55, alignItems:'center',  backgroundColor:'#514e65'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              ref = "cariText" 
              autoCapitalize = "none"
              onChangeText = {this.cariChangeText}
              onSubmitEditing = {this.cariContact}
              autoFocus = {false}
            />
            <Icon.Button style={{height:40, paddingLeft:18, marginTop:0, paddingTop:7}}
              name="search"
              backgroundColor="#3a384f"//</View>#3b5998"
              onPress={this.cariContact}
            ></Icon.Button>
        </View>
        <View style={{width:lebar, height:3, backgroundColor:'lightgray'}}/>

        <DBFlatList style={{flex:1, paddingTop:2, paddingLeft:0, paddingRight:0, backgroundColor:'#f0f0f0'}}
          query = 'SELECT * FROM tbphonekategori;'
          onRenderItem={this.drawRow}
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