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
import ListViewTable from "../components/ListViewTable.js"

let lebar =  Dimensions.get('window').width; 

export default class EasyPhoneKategoriScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Kategori"
    };
  };

  constructor(props) {
    super(props);
    this.state={
    }     
  }

  showEasyPhoneNumberScreen=(KategoriID, KategoriNama)=>{
//    console.log('Kategori ID: '+KategoriID);
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
drawRow = (dataJson) => {
  this.strip=!this.strip;
  return(
    <ListItem containerStyle={{backgroundColor:this.strip?'white':'#f8f8f8',  borderBottomWidth: 1, borderBottomColor: '#e8e8e8'}}
      onPress={()=>this.showEasyPhoneNumberScreen(dataJson.ID, dataJson.Nama)}
      key={dataJson.ID}
      title={dataJson.Nama}
      chevronColor="gray"
      chevron
  />
  )
} 

  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{alignItems:'center', marginTop:1, marginBottom:3, marginLeft:7, marginRight:7, paddingTop:5, paddingBottom:5, backgroundColor:'white'}}>
          <Image style={{borderRadius:5, width:lebar-10, height: lebar*(1/2.5), resizeMode: 'stretch'}} 
          source={{uri:'https://www.easyliving.id/images/rent/bukalapak.jpg'}}/>
        </View>
        <View style={{flexDirection:"row", height:55, alignItems:'stretch',  backgroundColor:'white'}}>
          <View style={{height:55, flexDirection:"row", alignItems:'center', backgroundColor:'white'}}>
            <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
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
          Query = {'SELECT * FROM tbphonekategori;'}
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