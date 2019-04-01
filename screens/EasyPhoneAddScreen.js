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
import {ImagePicker, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, CheckBox} from 'react-native-elements';
import {DBFlatList, HideableView, updateTable, updateTableCrypto, queryTable} from '../components/react-native-improva.js'
import localStorage from 'react-native-sync-localstorage'

let lebar =  Dimensions.get('window').width; 

export default class EasyPhoneAddScreen extends React.Component {

  colorPalette = ['#FFFFFF', '#F4FDE6', '#D6F3F4', '#D3E3FF', '#ABB0E5', '#D3CBF4', 
                  '#FAEBFF', '#FFE1DE', '#FFDECD', '#FFFBE6', '#FFF2D9', '#FFFBD9']
  param = [];

  static navigationOptions = ({ navigation }) => {
    return{
      title: "Tambah/Edit Contact",
      headerStyle: {backgroundColor: '#e7e9df'},
    };
  };

  getWarnaID=(warnaColor)=>{
    vIndex=0;
    this.colorPalette.map((warna, index)=>{
      if(warna==warnaColor){vIndex=index}
    });
    return vIndex;  
  }

  constructor(props) {
    super(props);
    const {kategoriID, kategoriNama, Data} = this.props.navigation.state.params;
    vWarna = Data==undefined?'#ffffff':Data.BackColor;
    this.state={
      cbState : Data==undefined?false:Data.Level==1,
      kategoriID : kategoriID==undefined?Data.KategoriID:kategoriID,
      kategoriNama : kategoriNama==undefined?"Kategori":kategoriNama,
      warnaColor : vWarna,
      warnaID : this.getWarnaID(vWarna),
      arrKategori : [],
    }
    if(Data!=undefined){
      this.param = Data;
    }
    queryTable('select * from easyliving.tbphonekategori order by ID asc')
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({arrKategori:responseJson});
    }).catch((error)=> console.error(error));
  }    


  componentDidMount(){
    this._sub = this.props.navigation.addListener('didFocus',this._componentFocused);
  }
       
  componentWillUnmount() {
    this._sub.remove();
  }
        
  _componentFocused = () => {
    if(localStorage.getItem('userToken')==''){
      Alert.alert('Info','Anda harus login untuk bisa menambahkan contact');
      this.props.navigation.navigate("Account",{callerScreen:"EasyPhoneAdd", cancelScreen:'EasyPhoneNumber'});
    }    
  }  


  drawItem = (item) => {
    var vArr = (item.Number).split(',');     
    return(
        <View style={{flex:1, height:item.Level==1?100:70, flexDirection:"column",  paddingTop:10, paddingLeft: 10, marginBottom:2, marginLeft:0, marginRight:0, backgroundColor:item.Level==1?item.BackColor:this.strip==0?'white':'#f9f9f9'}}>
          <Text style={{flex:0.5, color:'#404040', textAlign:'left', textAlignVertical:'top', fontSize:18, fontWeight:item.Level==1?'bold':'normal', backgroundColor: 'transparent'}}>
            {item.Nama}
          </Text>
          <Text style={{color:'#505050', width:lebar, textAlign:'left', textAlignVertical:'top', fontSize:14, backgroundColor: 'transparent'}}>
            {item.Level==1?item.Deskripsi:''}
          </Text>
          <View style={{flex:0.5, flexDirection:"row", justifyContent:"flex-end", alignItems:'flex-end', paddingBottom:10, backgroundColor: 'transparent'}}>
            <Text style={{color:'darkmagenta', paddingRight:10, textAlign:'right', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {item.Number}
            </Text>
          </View>
        </View>   
    )
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
    
  onUpdateResult(result){
    if(result='success'){Alert.alert('Sucess','Contact telah berhasil disimpan')}
    else {Alert.alert('Fail','Contact gagal disimpan')}
  }

  submitContact=()=> {
    var moment = require('moment');
    vTanggal = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let vUserID = localStorage.getItem('userData').ID
    let vKategori = this.refs.Kategori.value();
    let vNama = this.refs.Nama._lastNativeText;
    let vNumber = this.refs.Number._lastNativeText;
    if(vNama==undefined){vNama = this.param.Nama};
    if(vNumber==undefined){vNumber = this.param.Number};
    let vLevel=0
    if(this.state.cbState){
      vLevel=1;
      var vDeskripsi = this.refs.Deskripsi._lastNativeText;
      if(vDeskripsi==undefined){vDeskripsi=this.param.Deskripsi};
      var vColor = this.state.warnaColor;
    }
    console.log('level: '+vLevel)
    if(this.param.length!=0){
      console.log('update contact');
      if(vLevel==0){
        var query = 'UPDATE easyliving.tbphone SET KategoriID='+vKategori+', Nama="'+vNama+'", Number="'+vNumber+'", Level='+vLevel+', EditBy='+vUserID+', EditOn="'+vTanggal+'" WHERE ID='+this.param.ID;
      } else {
        var query = 'UPDATE easyliving.tbphone SET KategoriID='+vKategori+', Nama="'+vNama+'", Number="'+vNumber+'", Level='+vLevel+', Deskripsi="'+vDeskripsi+'", BackColor="'+vColor+'", EditBy='+vUserID+', EditOn="'+vTanggal+'" WHERE ID='+this.param.ID;
      }
        updateTableCrypto(query,()=>Alert.alert('Success','Perubahan telah berhasil disimpan'),()=> Alert.alert('Error','Perubahan gagal disimpan'));
    } else {
      console.log('insert contact');
      if(vLevel==0){
        var query = "INSERT INTO easyliving.tbphone (KategoriID, Nama, Number, Level, AddBy, AddOn) VALUES ('"+vKategori+"', '"+vNama+"', '"+vNumber+"', '"+vLevel+"', '"+vUserID+"', '"+vTanggal+"');"
      } else {
        var query = "INSERT INTO easyliving.tbphone (KategoriID, Nama, Number, Level, Deskripsi, BackColor, AddBy, AddOn) VALUES ('"+vKategori+"', '"+vNama+"', '"+vNumber+"', '"+vLevel+"', '"+vDeskripsi+"', '"+vColor+"', '"+vUserID+"', '"+vTanggal+"');"
      }
        updateTable(query,this.onUpdateResult);//){Alert.alert('Sucess','Contact berhasil ditambahkan')}else{Alert.alert('Error','Contact gagal ditambahkan')}
    }  
    console.log(query)
    this.props.navigation.state.params.onGoBack('from add contact');
    this.props.navigation.goBack();
  }


  warnaSelected=(warna,index)=>{
    this.setState({warnaID:index, warnaColor:warna})
  }

  render() {
    let lebar =  Dimensions.get('window').width; 
    console.log('render lg');
    return (
      <View style={{flex:1,  backgroundColor: 'white'}}>
        <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
            extraHeight={Platform.select({ android: 200 })}
        >      
        <ScrollView style={{flex:1, marginLeft:0, paddingTop:5, paddingLeft:0, paddingRight:0, backgroundColor:'white'}}>   
          <View style={{flex:1, alignItems:'flex-start', paddingLeft:20, paddingRight:20, backgroundColor:'white'}}>
            <Text style={styles.inputlabel}> 
              Kategori</Text>
            <Dropdown 
              dropdownOffset={{left:15, top:5}}
              rippleCentered={true}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              containerStyle={{backgroundColor:'#FFFCF4', borderWidth:1, borderColor:'lightgrey', borderRadius:5, width:lebar-50, marginLeft:10, marginRight:10, paddingLeft:5}}
              ref="Kategori" 
              pickerStyle={{backgroundColor: '#f7f9ef', marginRight:20}}
              itemCount={5}
              value={this.param.length!=0?this.param.KategoriID:this.state.kategoriID}
              valueExtractor={({ID}) => value=ID}
              labelExtractor={({Nama}) => label=Nama}
              data={this.state.arrKategori}
            />
            <Text style={styles.inputlabel}> 
                Nama</Text>
            <TextInput style={styles.textinputsingleline}
              ref="Nama"
              defaultValue = {this.param.Nama}
              underlineColorAndroid="transparent"
              autoCapitalize="words"
            />
            <Text style={styles.inputlabel}> 
                Nomor</Text>
            <TextInput style={styles.textinputsingleline}
              ref="Number"
              underlineColorAndroid="transparent"
              defaultValue = {this.param.Number}
              keyboardType="numbers-and-punctuation"
            />
            <CheckBox 
              containerStyle={{backgroundColor:'transparent', borderWidth:0}}
              textStyle={{fontWeight:'normal'}}
              title='Highlighted'
              checked={this.state.cbState}
              onPress={() => this.setState({cbState: !this.state.cbState})}
            />  
            <HideableView hide={!this.state.cbState}>
            <Text style={styles.inputlabelpendek}> 
              Deskripsi</Text>
            <TextInput style={styles.textinputmultiline}
              ref="Deskripsi"
              defaultValue = {this.param.Deskripsi}
              underlineColorAndroid="transparent"
              autoCapitalize="sentences"
              multiline={true}
              onChangeText={null}
              onSubmitEditing={null}
            />
            <Text style={styles.inputlabel}> 
              Background</Text>
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
            </HideableView>
            <View style={{height:40}}></View>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Button buttonStyle={{height:50, width:lebar-40, backgroundColor:'mediumseagreen'}}
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
  inputlabelpendek: {
    color:'#606060', 
    fontSize:14, 
    height:25,
    paddingTop: 0,
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