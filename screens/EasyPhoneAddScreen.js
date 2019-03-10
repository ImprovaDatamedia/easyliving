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
  ImageBackground,
  ListItem,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import EasyRentKategoriList from "./EasyLivingComp.js";
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { ImagePicker, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import {DBViewList, DBFlatList, updateTable} from '../components/react-native-improva.js'


let namaWaktu = ['jam','hari','minggu','bulan'];
let lebar =  Dimensions.get('window').width; 


export default class EasyPhoneAddScreen extends React.Component {

  colorPalette = ['#F4FDE6', '#F8EEDF', '#D6F3F4', '#D3E3FF', '#ABB0E5', '#D3CBF4', ,
                  '#FAEBFF', '#FFE1DE', '#FFDECD', '#FFFBE6', '#FFF2D9', '#FFFBD9']

  static navigationOptions = ({ navigation }) => {
    return{
      title: "Tambah Contact",
      headerStyle: {backgroundColor: '#e7e9df'},
    };
  };

  constructor(props) {
    super(props);
    this.state={
      isKategoriModalVisible : false,
      kategoriID : 1,
      kategoriNama : '',
      warnaID : 3,
      warnaColor : '#ffffff '
    }     
  }

  showEasyRentKategoriScreen=()=>{
    this.props.navigation.navigate("EasyRentKategori", {callerScreen:"EasyRentPasang"});
  }   


  drawItem = (item) => {
    return(
      <TouchableOpacity onPress={()=>this.kategorySelected(item)}>
      <View key={item.ID} style={{flex:1, height:40, flexDirection:"row", alignItems:'center', marginBottom:2, marginLeft:2, marginRight:2, borderRadius:3, backgroundColor:'white'}}>
          <Text  style={{color:'gray', marginLeft:10, fontSize:18, fontWeight:'normal', backgroundColor: 'transparent'}}>
              {item.Nama}
          </Text>
      </View>  
      </TouchableOpacity> 
    )
  }

  inputChangeText=(text,InputID)=>{
    this.cariText = text;
  }   

  selectPhoto=()=>{
    Alert.alert(
      'Upload Photo',
      'Pilih sumber photo',
      [
        {text: 'Kamera', onPress: this._pickImage},
        {text: 'Galeri Photo', onPress: this._libraryImage},
        {text: 'Cancel',style: 'cancel'}
      ],
      {cancelable: false},
    ); 
  }


  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    })
    if (!result.cancelled) {
      this.setState({
        Imguri1: result.uri,
        ImgFileName1 : result.uri.split('/').pop(),
        srcImg : {uri : result.uri}
      });
    }
    console.log('camera: '+this.state.srcImg)
  };

  _libraryImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })
    if (!result.cancelled) {
      this.setState({
        Imguri1: result.uri,
        ImgFileName1 : result.uri.split('/').pop(),
        srcImg : {uri : result.uri}
      });
    }
    console.log('galeri: '+this.state.srcImg)
  };
    

  submitContact=()=> {
    var moment = require('moment');
    vTangal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    var query = "INSERT INTO easyliving.tbphone (KategoriID, Nama, Number, Level, Deskripsi, BackColor, AddBy, AddOn) VALUES ('"+this.state.kategoriID+"', '"+this.refs.Nama._lastNativeText+"', '"+this.refs.Number._lastNativeText+"', '"+1+"', '"+this.refs.Deskripsi._lastNativeText+"', '"+this.state.warnaColor+"', '"+1+"', '"+vTanggal+"');"
    console.log(query)
    if(updateTable(query)){Alert.alert('Sucess','Contact berhasil ditambahkan')}else{Alert.alert('Error','Contact gagal ditambahkan')}
  }

  toggleKategoriModalVisible = () =>
    this.setState({ isKategoriModalVisible: !this.state.isKategoriModalVisible});

  kategorySelected(item){
    this.setState({kategoriID:item.ID, kategoriNama:item.Nama});
    this.setState({isKategoriModalVisible:false});
  }

  warnaSelected=(warna,index)=>{
    this.setState({warnaID:index, warnaColor:warna})
  }

  writeKategori=(kategoriID, kategoriNama)=>{
      return(
        <View style={{flexDirection:'row', justifyContent:'stretch'}}>
        <Text  style={{color:'#606060', width:80, height:50, paddingTop:22, fontSize:14, backgroundColor: 'transparent'}}>
          Kategori
        </Text>
        <Text  style={{color:'black', width:lebar-170, height:50, paddingTop:20, textAlign:'left',  marginLeft:0, paddingLeft:0, fontSize:16, backgroundColor: 'transparent'}}>
          {kategoriNama}
        </Text>  
        <Text style={{color:'#a3a3a3', width:50, height:50, textAlign:'right', paddingTop:24, fontSize:16, backgroundColor: 'transparent'}}>
        ▼
        </Text> 
        </View> 
      )
    }

  render() {
    let lebar =  Dimensions.get('window').width; 
    let arrSatuanWaktu = [{value:'perjam'},{value:'perhari'},{value:'perminggu'},{value:'perbulan'}];
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
            extraHeight={Platform.select({ android: 200 })}
        >      
        <ScrollView style={{flex:1, marginLeft:0, paddingTop:5, paddingLeft:0, paddingRight:0, backgroundColor:'white'}}>   

        <Modal 
              style={{borderRadius:5, justifyContent:'center', alignItems:'center'}} 
              backdropColor='gray' 
              isVisible={this.state.isKategoriModalVisible}
              onBackdropPress={() => this.setState({isKategoriModalVisible: false })}>
              <View style={{height:378, width:300, borderRadius:5, backgroundColor:'white'}}> 
              <View style={{height:40, alignItems:'center', justifyContent:'center', backgroundColor:'cornsilk'}}>
                <Text style={{fontSize:20}}>Pilih Kategori</Text>
              </View>
              <DBFlatList style={{flex:1, paddingTop:2, paddingLeft:0, paddingRight:0, backgroundColor:'#f0f0f0'}}
                  query = 'SELECT * FROM easyliving.tbphonekategori '
                  onRenderItem={(item) => this.drawItem(item)}
                  onTableEmpty={()=>(<View><Text>Empty</Text></View>)}
                />
              </View>
            </Modal>
          <View style={{flex:1, alignItems:'left', paddingLeft:20, paddingRight:20, backgroundColor:'white'}}>
            <TouchableOpacity onPress={this.toggleKategoriModalVisible}>
              <View style={{flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end', backgroundColor:'white'}}>
                <View style={{height:10, width:300, backgroundColor:'transparent'}}/>
                {this.writeKategori(this.state.kategoriID, this.state.kategoriNama)}
                <View style={{height:1,marginLeft:10, backgroundColor:'#d3d3d3'}}/>
                <View style={{height:8,backgroundColor:'transparent'}}/>
              </View>
            </TouchableOpacity>
            <Text style={styles.inputlabel}> 
                Nama</Text>
            <TextInput style={styles.textinputsingleline}
              ref="Nama"
              underlineColorAndroid="transparent"
              onChangeText = {(text) => { this.inputChangeText(text, 'Nama');}}
              onChangeText={this.cariChangeText}
              onSubmitEditing={this.cariBarang}
            />
            <Text style={styles.inputlabel}> 
                Nomor</Text>
            <TextInput style={styles.textinputsingleline}
              ref="Number"
              underlineColorAndroid="transparent"
              onChangeText = {(text) => { this.inputChangeText(text, 'Nomor');}}
              onChangeText={this.cariChangeText}
              onSubmitEditing={this.cariBarang}
            />
            <Text style={styles.inputlabel}> 
              Deskripsi</Text>
            <TextInput style={styles.textinputmultiline}
              ref="Deskripsi"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              multiline={true}
              onChangeText={this.cariChangeText}
              onSubmitEditing={this.cariBarang}
            />
            <Text style={styles.inputlabel}> 
              Warna Background</Text>
            <View style={{width:lebar-40, height:50, flexDirection:'row', justifyContent:"space-around"}}>
              {this.colorPalette.map((warna, index)=>{if(index<6){
                return(
                  <TouchableOpacity key={index} onPress={()=>this.setState({warnaID:index, warnaColor:warna})}>
                      <View style={{height:40, width:40, borderColor:this.state.warnaID==index?'#404040':'#C0C0C0', borderWidth:this.state.warnaID==index?5:1, borderRadius:5, backgroundColor:warna}}>
                  </View>
                  </TouchableOpacity>
                )
              }})}
            </View>
            <View style={{height:10}}></View>
            <View style={{width:lebar-40, height:50, flexDirection:'row', justifyContent:"space-around"}}>
              {this.colorPalette.map((warna, index)=>{if(index>=6){
                return(
                  <TouchableOpacity key={index} onPress={()=>this.setState({warnaID:index, warnaColor:warna})}>
                      <View style={{height:40, width:40, borderColor:this.state.warnaID==index?'#404040':'#C0C0C0', borderWidth:this.state.warnaID==index?5:1, borderRadius:5, backgroundColor:warna}}>
                  </View>
                  </TouchableOpacity>
                )
              }})}
            </View>
            <View style={{height:60}}></View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
              <Button buttonStyle={{height:40, width:100, backgroundColor:'mediumseagreen'}}
                raised
                onPress={this.submitContact}
                title="Submit"
                borderRadius={5}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />                
            </View>
            <View style={{height:80}}></View>
          </View>
        </ScrollView>
        </KeyboardAwareScrollView>
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
  inputlabel: {
    color:'#606060', 
    fontSize:14, 
    height:45,
    paddingTop: 20,
    backgroundColor:'transparent'
  },
  textinputsingleline: {
    marginLeft: 10, 
    marginRight:10, 
    marginTop:0, 
    borderRadius:5, 
    height: 40,
    width:lebar-50,  
    paddingLeft:5, 
    fontSize:16, 
    borderColor: '#C8C8C8', 
    borderWidth: 1, 
    backgroundColor:'#FFFCF4'
  },
  textinputhalfline: {
    marginLeft: 10, 
    marginRight:10, 
    marginTop:0, 
    borderRadius:5, 
    height: 40,
    width: (lebar/2)-36,  
    paddingLeft:5, 
    fontSize:16, 
    borderColor: '#C8C8C8', 
    borderWidth: 1, 
    backgroundColor:'#FFFCF4'
  },
  textinputmultiline: {
    marginLeft: 10, 
    marginRight:10, 
    marginTop:0, 
    borderRadius:5, 
    height: 80,
    width:lebar-50,  
    paddingLeft:5, 
    fontSize:16, 
    borderColor: '#C8C8C8', 
    borderWidth: 1, 
    backgroundColor:'#FFFCF4'
  },

  dropdown: {
    backgroundColor: '#f4f4f4',
  },

});  