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
import localStorage from 'react-native-sync-localstorage'


//let namaWaktu = ['jam','hari','minggu','bulan'];
const namaWaktu = [{"ID":"1","Nama":"jam","Satuan":"perjam"},{"ID":"2","Nama":"hari","Satuan":"perhari"},{"ID":"3","Nama":"minggu","Satuan":"perminggu"},{"ID":"4","Nama":"bulan","Satuan":"perbulan"}];

let lebar =  Dimensions.get('window').width; 


export default class EasyRentPasangScreen extends React.Component {

  param = null;
  photoChange = false;

  
  static navigationOptions = ({ navigation }) => {
    return{
      title: "Pasang Iklan"
    };
  };

  constructor(props) {
    super(props);
    const {Data} = this.props.navigation.state.params;
    vkategoriID=0;
    vkategoriNama='';
    vGambaruri = '';
    vGambarSrc = require('../assets/images/EasyRent/AddPhoto.png'); 
    vGambarName = '';
    if(Data!=undefined){
      this.param = Data;
      console.log('param asal: '+this.param)
      vkategoriID=Data.KategoriID;
      vkategoriNama=Data.KategoriNama;
      vGambarName = Data.Gambar;
      vGambaruri = 'https://www.easyliving.id/app/assets/image/'+Data.Gambar;
      vGambarSrc = {uri: vGambaruri};
    }  
    this.state={
      isKategoriModalVisible : false,
      kategoriID : vkategoriID,
      kategoriNama : vkategoriNama,
      ImgFileName1 : vGambarName,
      Imguri1 : vGambaruri,
      srcImg : vGambarSrc,
    }
//    source={{uri: 'https://www.easyliving.id/app/assets/image/'+this.state.param.Gambar}} 
//    srcImg : require('../assets/images/EasyRent/AddPhoto.png'),

  }

  componentDidMount(){
    this._sub = this.props.navigation.addListener('didFocus',this._componentFocused);
  }
       
  componentWillUnmount() {
    this._sub.remove();
  }
        
  _componentFocused = () => {
    if(localStorage.getItem('userToken')==''){
      Alert.alert('Maaf','Anda harus login untuk bisa memasang iklan');
      this.props.navigation.navigate("Account",{callerScreen:"EasyRentPasang", cancelScreen:'EasyRent'});
    }    
  }  


  showEasyRentKategoriScreen=()=>{
    this.props.navigation.navigate("EasyRentKategori", {callerScreen:"EasyRentPasang"});
  }   


  selectPhoto=()=>{
    this.photoChange = false;
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
      this.photoChange = true;  
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
      this.photoChange = true;  
      this.setState({
        Imguri1: result.uri,
        ImgFileName1 : result.uri.split('/').pop(),
        srcImg : {uri : result.uri}
      });
    }
    console.log('galeri: '+this.state.srcImg)
  };


  submitIklan=()=> {
    vNamaBarang = this.refs.NamaBarang._lastNativeText;
    vKategoriID = this.state.kategoriID;
    vDeskripsi = this.refs.Deskripsi._lastNativeText;
    vHarga = this.refs.Harga._lastNativeText;
    vSatuanWaktu = this.refs.SatuanWaktu.value();
    vMinWaktu = this.refs.MinWaktu._lastNativeText;    
    vMaxWaktu = this.refs.MaxWaktu._lastNativeText;
    vGambar = this.state.Imguri1;
    vNoContact = this.refs.NoContact._lastNativeText
    console.log('param: '+this.param); 
    if(vNamaBarang==undefined){vNamaBarang = this.param!=null?this.param.NamaBarang:''};
    if(vKategoriID==undefined){vKategoriID = this.param!=null?this.param.KategoriID:''};
    if(vDeskripsi==undefined){vDeskripsi = this.param!=null?this.param.Deskripsi:''};
    if(vHarga==undefined){vHarga = this.param!=null?this.param.Harga:''};
    if(vSatuanWaktu==undefined){vSatuanWaktu = this.param!=null?this.param.SatuanWaktu:'hari'};
    if(vMinWaktu==undefined){vMinWaktu = this.param!=null?this.param.MinWaktu:1};
    if(vMaxWaktu==undefined){vMaxWaktu = this.param!=null?this.param.MaxWaktu:0};
    if(vNoContact==undefined){vNoContact = this.param!=null?this.param.NoContact:''};
    console.log('Satuan Waktu: '+vSatuanWaktu);
    if(vNamaBarang==''){Alert.alert('Maaf','Harap isi nama barang'); return false}
    if(vKategoriID==''){Alert.alert('Maaf','Harap pilih kategori'); return false}
    if(vDeskripsi==''){Alert.alert('Maaf','Harap isi deskripsi'); return false}
    if(vHarga==''){Alert.alert('Maaf','Harap isi tarif sewa'); return false}
    if(vSatuanWaktu==''){Alert.alert('Maaf','Harap isi satuan waktu'); return false}
    if(vGambar==''){Alert.alert('Maaf','Gambar blm ada'); return false}
    if(vNoContact==''){Alert.alert('Maaf','Mohon cantumkan nomor telp. yang bisa dihubungi'); return false}
   
    ID=0;
    let UserID = localStorage.getItem('userData').ID
    if(this.param!=null){ID=this.param.ID}
    this.props.navigation.navigate("EasyRentPasangConfirm",{
      ID : ID,
      UserID : UserID, 
      NamaBarang: vNamaBarang, 
      KategoriID: vKategoriID, 
      Deskripsi: vDeskripsi, 
      Harga: vHarga, 
      SatuanWaktu: vSatuanWaktu, 
      MinWaktu: vMinWaktu!=undefined?vMinWaktu:1, 
      MaxWaktu: vMaxWaktu!=undefined?vMaxWaktu:1, 
      Imguri1 : this.state.Imguri1,
      ImgFilename1: this.photoChange?this.state.ImgFileName1:'',
      onGoBack:this.props.navigation.state.params.onGoBack,
      NoContact: vNoContact, 
    })
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
//    let param = this.props.navigation.getParam('Data', []); 
//    console.log('param: '+JSON.stringify(param));
//    let arrSatuanWaktu = [{value:'perjam'},{value:'perhari'},{value:'perminggu'},{value:'perbulan'}];
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
              defaultValue = {this.param!=null?this.param.NamaBarang:''}
              underlineColorAndroid="transparent"
              autoCapitalize="words"
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
              defaultValue = {this.param!=null?this.param.Deskripsi:''}
              autoCapitalize="sentences"
              multiline={true}
            />
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.inputlabel}> 
              Tarif Sewa</Text>
            <TextInput style={styles.textinputhalfline}
              ref="Harga"
              underlineColorAndroid="transparent"
              defaultValue = {this.param!=null?this.param.Harga:''}
              autoCapitalize="none"
              keyboardType="numeric"
            />
            </View>
            <View style={{width:150, paddingLeft:20, paddingTop:20}}>
            <Dropdown
              ref="SatuanWaktu" 
              pickerStyle={styles.dropdown}
              data={namaWaktu}
              defaultValue={this.param!=null?'per'+this.param.SatuanWaktu:"perhari"}
              valueExtractor={({Nama}) => value=Nama}
              labelExtractor={({Satuan}) => label=Satuan}
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
              defaultValue = {this.param!=null?this.param.MinWaktu:''}
              autoCapitalize="none"
              keyboardType="numeric"
            />
            </View>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.inputlabel}> 
              Max Waktu Sewa</Text>
            <TextInput style={styles.textinputhalfline}
              ref="MaxWaktu"
              underlineColorAndroid="transparent"
              defaultValue = {this.param!=null?this.param.MaxWaktu:''}
              autoCapitalize="none"
              keyboardType="numeric"
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
            <Text style={styles.inputlabel}> 
            Hubungi pemasang iklan di no:</Text>
            <TextInput style={styles.textinputsingleline}
              ref="NoContact"
              defaultValue = {this.param!=null?this.param.NoContact:''}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />

            <View style={{height:40}}></View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <Button buttonStyle={{height:50, width:lebar-50, backgroundColor:'mediumseagreen'}}
                raised
                onPress={this.submitIklan}
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