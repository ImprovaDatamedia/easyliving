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
    this.props.navigation.navigate("EasyPhoneNumber", {kategoriID:0, kategoriNama:'', cariContact:this.refs.cariText._lastNativeText});
  } 
 
  showEasyPhoneNumberScreen=(kategoriID, kategoriNama)=>{
    console.log(kategoriID+'  '+kategoriNama)
    this.props.navigation.navigate("EasyPhoneNumber", {kategoriID:kategoriID, kategoriNama:kategoriNama});
  }   


drawRow = (item) => {
  let lebar =  Dimensions.get('window').width; 
return(
  <View style={{height:90}}>
    <View style={{height:30}}/>
    <HomeIconButton onPress={()=>{this.showEasyPhoneNumberScreen(item.ID, item.Nama)}} imageSource={{uri: 'http://www.easyliving.id:81/images/icons/'+item.Icon}} label={item.Nama} labelStyle='normal' style={{width:lebar/4, height:50}}/>
  </View>
)
}
 

  render() {
    let lebar =  Dimensions.get('window').width; 
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <View style={{alignItems:'center', marginTop:0, marginBottom:0, marginLeft:0, marginRight:0, paddingTop:0, paddingBottom:0, backgroundColor:'white'}}>
          <Image style={{borderRadius:0, width:lebar, height: lebar*(1/2.5), resizeMode: 'stretch'}} 
          source={{uri:'http://www.easyliving.id:81/images/main/eContactHead.png'}}/>
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
        <DBFlatList style={{flex:1, alignItems:'center',  backgroundColor:'white'}}
          query = 'SELECT * FROM tbphonekategori;'
          onRenderItem={this.drawRow}
          numColumns = {4}
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