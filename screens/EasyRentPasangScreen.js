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
  Picker,
  TextInput,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import EasyRentKategoriList from "./EasyLivingComp.js"


export default class EasyRentPasangScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      headerRight: (
        <View style={{flex:1, flexDirection:"row", marginRight:15, alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
          <Button
            onPress={()=>{navigation.navigate("Blank")}}
            title="Cancel"
            color="dodgerblue"
          />
          <Button
            onPress={()=>{navigation.navigate("Blank")}}
            title="Submit"
            color="dodgerblue"
          />
        </View>
      ),    
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

  showEasyRentKategoriScreen=()=>{
    this.props.navigation.navigate("EasyRentKategori", {callerScreen:"EasyRentPasang"});
  }   

/*  gettbRent = (from, count) => {
    var table=[];
    return fetch('http://mwn.improva.id:8084/gpsloc/reactnative/API.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token : 'SELECT',
        query : 'SELECT * FROM tbeasyrent ;'//+vWhere,
      })
    }).then((response) => {return response.json()
    }).then((responseJson) => {
      if (responseJson.length>0) {
        for(i=0;i<responseJson.length;i++){
          var val= this.drawRow(responseJson[i]);
          table.push(val);
        }
        this.setState({rowData:table})
      }
    }).catch((error) => {
      console.error(error);
    });
  }
*/


  drawRow = (dataJson) => {
    if(dataJson.MinWaktu>1){minWaktuSewa=', min:'+dataJson.MinWaktu+' '+dataJson.Waktu} else {minWaktuSewa=''};
    if(dataJson.MaxWaktu!=0){maxWaktuSewa=', max:'+dataJson.MaxWaktu+' '+dataJson.Waktu} else {maxWaktuSewa=''};
    return(
      <View key={dataJson.ID} style={{flex:1, flexDirection:"row", alignItems:'left', marginBottom:8, marginLeft:7, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
        <Image source={{uri: 'https://www.klikteknik.com/wp-content/uploads/'+dataJson.Gambar}} style={{marginTop:10, marginLeft:10, width:80, height:80, resizeMode: 'stretch'}}/>
        <View style={{flex:1, alignItems:'left', paddingTop:10, paddingBottom:10, marginLeft:10, marginRight:7, borderRadius:5, backgroundColor:'white'}}>
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

  showKatagoriList(){
    return(
      <View style={{height:300, width:200, alignItems:'center', borderRadius:5, backgroundColor:'white'}}>
        <Text>I am the modal content!</Text>
        <Button
            onPress={this.toggleKategoriModalVisible}
            title="Cancel"
            color="dodgerblue"
          />
      </View>
    )
  }

  toggleKategoriModalVisible = () =>
    this.setState({ isKategoriModalVisible: !this.state.isKategoriModalVisible});

  selectKategori=(kategoriID, kategoriNama)=>{
    this.setState({kategoriID:kategoriID});
    this.setState({kategoriNama:kategoriNama});
    this.setState({isKategoriModalVisible:false});
  }   
  
  writeKategori=(kategoriID, kategoriNama)=>{
    if(kategoriID==0){
      return(
        <Text  style={{color:'#a3a3a3', height:50, paddingTop:22, fontSize:16, backgroundColor: 'transparent'}}>
          Kategori
        </Text>
      )
    }
    else {
      return(
        <View style={{flex:1, height:50, justyfyContent:'top', backgroundColor:'transparent'}}>
        <Text  style={{color:'#a3a3a3', height:15, paddingTop:0, fontSize:12, backgroundColor: 'transparent'}}>
          Kategori
        </Text>
        <Text  style={{color:'black', height:35, paddingTop:7, fontSize:16, backgroundColor: 'transparent'}}>
          {kategoriNama}
        </Text>
        </View>
      )
    }
  }

  render() {
    let lebar =  Dimensions.get('window').width; 
    let arrSatuanWaktu = [{value:'jam'},{value:'hari'},{value:'minggu'},{value:'bulan'}];
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <ScrollView style={{flex:1, paddingTop:5, paddingLeft:0, paddingRight:0, backgroundColor:'white'}}>   
          <View style={{flex:1,paddingLeft:20, paddingRight:20, backgroundColor:'white'}}>
          <TextInput style={{marginLeft: 10, marginRight:10, marginTop:0, borderRadius:5, height: 40, width:lebar-80,  paddingLeft:5, borderColor: '#b2b2b2', borderWidth: 1, backgroundColor:'#FFFCF4'}}
              underlineColorAndroid = "transparent"
              autoCapitalize = "none"
              onChangeText = {this.cariChangeText}
              onSubmitEditing = {this.cariBarang}
            />
            <Modal 
              style={{margin:10, borderRadius:5}} 
              backdropColor='gray' 
              isVisible={this.state.isKategoriModalVisible}
              onBackdropPress={() => this.setState({isKategoriModalVisible: false })}>
              <View style={{height:400, borderRadius:5, backgroundColor:'white'}}> 
                <View style={{height:40, alignItems:'center', justifyContent:'center', borderRadius:3, backgroundColor:'#cd695a'}}>
                  <Text  style={{color:'#e8e8e8', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
                    Pilih Kategori Barang </Text>
                </View>
                <EasyRentKategoriList onSelectOne={this.selectKategori}/>
              </View>
            </Modal>
            <TouchableOpacity onPress={this.toggleKategoriModalVisible}>
            <View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end', backgroundColor:'white'}}>
              <View style={{height:10, backgroundColor:'transparent'}}/>
              {this.writeKategori(this.state.kategoriID, this.state.kategoriNama)}
              <View style={{height:1,backgroundColor:'#d3d3d3'}}></View>
              <View style={{height:8,backgroundColor:'transparent'}}></View>
            </View>  
            </TouchableOpacity>
            <TextField
              multiLine={true}
              label = 'Deskripsi'
            />
            <TextField keyboardType='number-pad' 
              label = 'Tarif Sewa'
            />
            <Dropdown 
              pickerStyle={styles.dropdown}
              label='Satuan waktu'
              data={arrSatuanWaktu}
            />
            <TextField keyboardType='number-pad'
              label = 'Min Waktu Sewa'
            />
             <TextField keyboardType='number-pad'
              label = 'Max Waktu Sewa'
            />
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
  dropdown: {
    backgroundColor: '#f4f4f4',
  },

});  