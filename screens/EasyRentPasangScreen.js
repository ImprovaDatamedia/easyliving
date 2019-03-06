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
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import EasyRentKategoriList from "./EasyLivingComp.js";
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { ImagePicker, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

let namaWaktu = ['jam','hari','minggu','bulan'];
let lebar =  Dimensions.get('window').width; 

export default class EasyRentPasangScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Pasang Iklan"
    };
  };

  constructor(props) {
    super(props);
    this.state={
      isKategoriModalVisible : false,
      kategoriID : 0,
      kategoriNama : '',
      Imguri1 : '',
      ImgFileName1 : '',
      srcImg : require('../assets/images/EasyRent/AddPhoto.png'),
    }     
  }

  showEasyRentKategoriScreen=()=>{
    this.props.navigation.navigate("EasyRentKategori", {callerScreen:"EasyRentPasang"});
  }   


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

  inputChangeText=(text,InputID)=>{
    this.cariText = text;
  }   

  selectPhoto=()=>{
    Alert.alert(
      'Upload Photo',
      'Pilih sumber photo',
      [
        {text: 'Kamera', onPress: this._pickImage},
        {text: 'Galeri', onPress: this._libraryImage},
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


  submitIklan=()=> {
    this.props.navigation.navigate("EasyRentPasangConfirm",{
      NamaBarang: this.refs.NamaBarang._lastNativeText, 
      Kategori: this.state.kategoriID, 
      Deskripsi: this.refs.Deskripsi._lastNativeText, 
      TarifSewa: this.refs.TarifSewa._lastNativeText, 
      SatuanWaktu: namaWaktu[this.refs.SatuanWaktu.selectedIndex()], 
      MinWaktu: this.refs.MinWaktu._lastNativeText, 
      MaxWaktu: this.refs.MaxWaktu._lastNativeText, 
      Gambar: '2016/05/Bor-Maktec-MT60.jpg',
      Imguri1 : this.state.Imguri1,
      ImgFilename1: this.state.ImgFileName1})
  }


  toggleKategoriModalVisible = () =>
    this.setState({ isKategoriModalVisible: !this.state.isKategoriModalVisible});

  selectKategori=(kategoriID, kategoriNama)=>{
    this.setState({kategoriID:kategoriID});
    this.setState({kategoriNama:kategoriNama});
    this.setState({isKategoriModalVisible:false});
  }   
  
  writeKategori=(kategoriID, kategoriNama)=>{
      return(
        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
        <Text  style={{color:'#a3a3a3', width:80, height:50, paddingTop:22, fontSize:14, backgroundColor: 'transparent'}}>
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
        <ScrollView style={{flex:1, paddingTop:5, paddingLeft:0, paddingRight:0, backgroundColor:'white'}}>   
          <View style={{flex:1,paddingLeft:20, paddingRight:20, backgroundColor:'white'}}>
          <Text style={styles.inputlabel}> 
            Nama Barang</Text>
          <TextInput style={styles.textinputsingleline}
              ref="NamaBarang"
              underlineColorAndroid="transparent"
              onChangeText = {(text) => { this.inputChangeText(text, 'NamaBarang');}}
              onChangeText={this.cariChangeText}
              onSubmitEditing={this.cariBarang}
            />
            <Modal 
              style={{margin:10, borderRadius:5}} 
              backdropColor='gray' 
              isVisible={this.state.isKategoriModalVisible}
              onBackdropPress={() => this.setState({isKategoriModalVisible: false })}>
              <View style={{height:400, borderRadius:5, backgroundColor:'white'}}> 
                <EasyRentKategoriList onSelectOne={this.selectKategori}/>
              </View>
            </Modal>
            <TouchableOpacity onPress={this.toggleKategoriModalVisible}>
            <View style={{flex:1, flexDirection:'column', alignItems:'stretch', justifyContent:'flex-end', backgroundColor:'white'}}>
              <View style={{height:10, width:300, backgroundColor:'transparent'}}/>
              {this.writeKategori(this.state.kategoriID, this.state.kategoriNama)}
              <View style={{height:1,marginLeft:10, backgroundColor:'#d3d3d3'}}></View>
              <View style={{height:8,backgroundColor:'transparent'}}></View>
            </View>  
            </TouchableOpacity>
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
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.inputlabel}> 
              Tarif Sewa</Text>
            <TextInput style={styles.textinputhalfline}
              ref="TarifSewa"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={this.cariChangeText}
              onSubmitEditing={this.cariBarang}
            />
            </View>
            <View style={{width:150, paddingLeft:20, paddingTop:20}}>
            <Dropdown
              ref="SatuanWaktu" 
              pickerStyle={styles.dropdown}
              value='perhari'
              data={arrSatuanWaktu}
            />
            </View>
            </View>

            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.inputlabel}> 
              Min Waktu Sewa</Text>
            <TextInput style={styles.textinputhalfline}
              ref='MinWaktu'
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={this.cariChangeText}
              onSubmitEditing={this.cariBarang}
            />
            </View>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.inputlabel}> 
              Max Waktu Sewa</Text>
            <TextInput style={styles.textinputhalfline}
              ref="MaxWaktu"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={this.cariChangeText}
              onSubmitEditing={this.cariBarang}
            />
            </View>
            </View>
            <View style={{height:10}}></View>
            <Text style={styles.inputlabel}> 
              Gambar</Text>
            <View style={{flex:1, paddingLeft:10, borderColor:'gray', alignItems: 'flex-start', backgroundColor:'transparent'}}>
              <TouchableOpacity onPress={this.selectPhoto}>
                <Image source={this.state.srcImg} style={{borderWidth:1, borderColor:'#C8C8C8', backgroundColor:'#FFFCF4', height: 150, width: 150, resizeMode: 'stretch', borderRadius: 5}} />
              </TouchableOpacity>    
            </View>

            <View style={{height:60}}></View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <Button buttonStyle={{height:40, width:100, backgroundColor:'mediumseagreen'}}
                raised
                onPress={this.submitIklan}
                title="Pasang"
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
    color:'darkgray', 
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