import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {DBText, ImageAlter, ActionIconButton, DisplayHarga, updateTable, RupiahFormat} from "../components/react-native-improva.js"
import localStorage from 'react-native-sync-localstorage';
import Slideshow from 'react-native-image-slider-show';

let imgPath = 'https://www.easyliving.id/app/assets/image/';

export default class EasyTradeDetailScreen extends React.Component {
  
  needRefresh = false;
  kategoriNama = '';

  static navigationOptions = ({ navigation }) => {
    return{
      title: "Iklan Detail",
      headerStyle: {backgroundColor: '#e7e9df'},
    };
  };

  constructor(props) {
    super(props);
    this.state={
      param : this.props.navigation.getParam('Data', []),
    };      
  }     
  

  componentDidMount(){
    this._sub = this.props.navigation.addListener('didFocus',this._componentFocused);
  }
     
  componentWillUnmount() {
    this._sub.remove();
  }
      
  _componentFocused = () => {
    if(localStorage.getItem('userToken')==''){
      Alert.alert('Maaf','Anda harus login untuk bisa melihat detail iklan');
      this.props.navigation.navigate("Account",{callerScreen:"EasyTradeDetail", cancelScreen:'EasyTrade'});
    }  
    if(this.needRefresh) {
      queryTable('select * from easyliving.tbeasytrade where ID='+this.state.param.ID)
        .then((response) => response.json())
        .then((responseJson) => {
          let vjs = responseJson;
          this.setState({param:responseJson[0]}) 
        }).catch((error)=> console.error(error)); 
        this.needRefresh = false;
    }
  }


  onGoBack = (data) => {
    console.log('onGoBack');
    this.needRefresh = true;
    if(this.props.navigation.state.params.onGoBack!=undefined){
      this.props.navigation.state.params.onGoBack('from detail edit');
    }
  }; 


  askDeleteItem=()=>{
    if(this.state.param.UserID!=localStorage.getItem('userData').ID){Alert.alert('Maaf','Anda tidak berwenang mendelete iklan ini');return}
    Alert.alert('Konfirmasi','Setuju untuk mendelete iklan ini?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.deleteItem()},
      ],
      {cancelable: false},
    );    
  }   

  deleteItem=()=>{
    let whereQuery = this.props.navigation.getParam('whereQuery',''); 
    query = "DELETE FROM easyliving.tbeasytrade WHERE ID="+this.state.param.ID;
    if(updateTable(query))
    {
      alert('Data berhasil dihapus');
      console.log('whereQuery: '+whereQuery);
      if(this.props.navigation.state.params.onGoBack!=undefined){
        this.props.navigation.state.params.onGoBack('from delete');
      }
      this.props.navigation.navigate('EasyTrade',{whereQuery:whereQuery})
    }else{alert('Gagal')};
  }

  editItem=()=>{
    if(this.state.param.UserID!=localStorage.getItem('userData').ID){Alert.alert('Maaf','Anda tidak berwenang mengedit iklan ini');return}
    item = this.state.param;
    item['KategoriNama'] = this.kategoriNama;
    console.log('item on detail: '+JSON.stringify(item))
    this.props.navigation.navigate("EasyTradePasang", {Data:item, onGoBack:this.props.navigation.state.params.onGoBack});
  }

  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)
    return (
        <View Style={{justifyContent:'center', alignItems: 'center', height:300, width: 256}}>
            <Image style={{width: 256, height: 144, borderRadius:10}} source={{ uri: item.thumbnail }} />
            {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
            <Text>{item.title}</Text>
        </View>
    );
  }


  render() {

    let lebar =  Dimensions.get('window').width; 
    if(this.state.param.MinWaktu>1){minWaktuSewa='minimum: '+this.state.param.MinWaktu+' '+this.state.param.SatuanWaktu} else {minWaktuSewa=''};
    if(this.state.param.MaxWaktu!=0){maxWaktuSewa='maximum: '+this.state.param.MaxWaktu+' '+this.state.param.SatuanWaktu} else {maxWaktuSewa=''};
    var moment = require('moment');
    let vDate = moment(moment(this.state.param.Tanggal).format("YYYY-MM-DD HH:mm:ss")).format("DD MMM YYYY HH:mm:ss");
    let vQuery = 'SELECT Nama AS Value FROM easyliving.tbuser WHERE ID='+this.state.param.UserID+';';
    let vQueryKategori = 'SELECT Nama AS Value FROM easyliving.tbeasyrentkategori WHERE ID='+this.state.param.KategoriID+';';
    console.log('hallo');
    return (
      <View style={{flex:1, marginBottom:5, backgroundColor: 'white'}}>
         <View style={{justifyContent: 'space-around', flexDirection:"row", height:60, paddingTop:5, alignItems:'center',  backgroundColor:'#f4f4f4'}}>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton name="blank"/>
          <ActionIconButton  color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.editItem} name="edit" label='Edit'/>
          <ActionIconButton  color='#606060' backgroundColor='#f4f4f4' fontColor='#404040' onPress={this.askDeleteItem} name="trash-o" label='Delete'/>
        </View>
        <View style={{height:1, backgroundColor:'lightgray'}}/>
        <ScrollView  style={{flex:1, backgroundColor:'#f4f4f4'}}>
          <View style={{margin:5, height:lebar-70, borderRadius:5, justifyContent:'center', alighItems:'center', backgroundColor:'white'}}>
          <Slideshow 
            dataSource={[
              {url: 'http://www.easyliving.id:81/app/assets/image/'+this.state.param.Gambar1},
              {url: 'http://www.easyliving.id:81/app/assets/image/'+this.state.param.Gambar2},
              {url: 'http://www.easyliving.id:81/app/assets/image/'+this.state.param.Gambar3},
            ]}
            height={lebar*3/4}
          />     

          </View>
          <View style={{margin:5,  borderRadius:5, backgroundColor:'#fcfcfc'}}>
            <Text style={{color:'gray', marginLeft:10, marginTop:5, textAlign:'left', textAlignVertical:'top', fontSize:20, fontWeight:'bold', backgroundColor: 'transparent'}}>
              {this.state.param.Nama}
            </Text>
            <View style={{height:10}}/>
            <Text style={{color:'gray', marginLeft:10, marginRight:10, marginTop:5, marginBottom:10, textAlign:'left', textAlignVertical:'top', fontSize:18, backgroundColor: 'transparent'}}>
              {this.state.param.Deskripsi}
            </Text>
          </View>
          <View style={{margin:5, paddingLeft:10, paddingTop:20, paddingBottom:10, paddingRight:10, borderRadius:5, backgroundColor:'white'}}>
            <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Harga: '}
              <Text  style={{color:'darkmagenta', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'bold', backgroundColor: 'transparent'}}>
                {RupiahFormat(this.state.param.Harga)}
              </Text>
            </Text>
          <View style={{height:15}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Kategori: '}
            <DBText query={vQueryKategori} onGetText={(text)=> {this.kategoriNama=text}} style={{color:'dodgerblue'}}/>
          </Text>
          <View style={{height:15}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Dipasang oleh: '}
            <DBText query={vQuery} style={{color:'dodgerblue'}}/>
          </Text>
          <View style={{height:15}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Pada tanggal: '}
            <Text style={{color:'dodgerblue'}}>
              {vDate}
            </Text>
          </Text>
          <View style={{height:15}}/>
          <Text  style={{color:'gray', textAlign:'left', textAlignVertical:'center', fontSize:16, fontWeight:'normal', backgroundColor: 'transparent'}}>
            {'Hubungi pemasang iklan di no.: '}
            <Text style={{color:'dodgerblue'}}>
              {this.state.param.NoContact}
            </Text>
          </Text>
          <View style={{height:60}}/>
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